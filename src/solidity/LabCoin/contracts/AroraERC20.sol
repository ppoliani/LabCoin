pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./Owned.sol";
import "./TokenRecipient.sol";
import "./ERC20Interface.sol";

contract AroraERC20 is ERC20Interface, Owned {
  string public name;
  string public symbol;
  uint8 public decimals = 2;
  uint256 public supply;
  uint256 public sellPrice;
  uint256 public buyPrice;

  // ICO related prop
  uint256 public endTime;

  // If our clients have not enough ethers in their account they won't be able to call some of the methods
  // of this contract. Ideally we don't wont our users to be worried about ethers or blockchain etc.
  // Instead we can auto refill users balance as soon as it detects the balance is low.
  uint256 private minBalanceForAccounts = 5 finney; // 0.005 ether

  mapping (address => uint256) public balanceOf;
  mapping (address => bool) public frozenAccounts;
  mapping (address => mapping (address => uint256)) public allowance;
  
  //  Events
  event LogTransfer(address indexed from, address indexed to, uint256 value);
  event LogFrozenAccount(address target, bool isFrozen);
  event LogApproval(address indexed owner, address indexed spender, uint256 value);
  
  function AroraERC20(uint256 _supply, string _token, string _symbol, uint8 _decimals) public {
    decimals = _decimals;
    name = _token;
    symbol = _symbol;
    supply = _supply * 10 * decimals;
    balanceOf[msg.sender] = supply;
    endTime = now + 1 weeks; // By default it is 1 week but we can change that later on
  }

  function _transfer(address from, address to, uint256 value) internal returns (bool success) {
    require(to != 0x0); // prevent transfer to 0x0 address. Use burn() instead
    require(value > 0);
    require(balanceOf[from] > value); // Has sender enough balance?
    require(balanceOf[to] + value > balanceOf[to]); // check for overflows
    require(!frozenAccounts[from]); 
    require(!frozenAccounts[to]); 

    balanceOf[from] -= value;
    balanceOf[to] += value;

    LogTransfer(from, to, value);

    return true;
  }

  function _autoRefillIfNeed() internal {
    if(msg.sender.balance < minBalanceForAccounts) {
      // sell the following amount so you can fund the execution of the invoked method
      sell((minBalanceForAccounts - msg.sender.balance) / sellPrice);
    }
  }

  function totalSupply() public constant returns (uint256) {
    return supply;
  }

  function allowance(address owner, address spender) public constant returns (uint256) {
    return allowance[owner][spender];
  }

  function balanceOf(address owner) public constant returns (uint256) {
    if(owner == 0) {
      return balanceOf[msg.sender]; 
    }
    else { 
      return balanceOf[owner];
    }
  }

  /// @notice Send `value` tokens to `to` from your account
  /// @param to The address of the recipient
  /// @param value the amount to send
  function transfer(address to, uint256 value) public returns (bool) {
    _autoRefillIfNeed();
    return _transfer(msg.sender, to, value);
  }

  /// @notice Send `value` tokens to `to` on behalf of `from`
  /// @param from The address of the sender
  /// @param to The address of the recipient
  /// @param value the amount to send
  function transferFrom(address from, address to, uint256 value) public returns (bool) {
    require(value <= allowance[from][msg.sender]);
    allowance[from][msg.sender] -= value;
    _transfer(from, to, value);
    return true;
  }

  /// @notice Allows `spender` to spend no more than `value` tokens on your behalf
  /// @param spender The address authorized to spend
  /// @param value the max amount they can spend
  function approve(address spender, uint256 value) public returns (bool) {
    allowance[msg.sender][spender] = value;
    LogApproval(msg.sender, spender, value);
    return true;
  }

  /// @notice Allows `_spender` to spend no more than `value` tokens in your behalf, and then ping the contract about it
  /// @param _spender The address authorized to spend
  /// @param value the max amount they can spend
  /// @param extraData some extra information to send to the approved contract
  /// for contracts, you should first approve an amount of tokens they can move from your account and then ping
  /// them to let them know they should do their thing
  function approveAndCall(address _spender, uint256 value, bytes extraData) public returns (bool) {
    TokenRecipient spender = TokenRecipient(_spender);

    if(approve(_spender, value)) {
      spender.receiveApproval(msg.sender, value, this, extraData);
      return true;
    }
  }

  // Allow owner to create new tokens; i.e. create new tokens from a thin air
  function mintToken(address target, uint256 amount) public onlyOwner {
    balanceOf[target] += amount;
    supply += amount;

    LogTransfer(0, owner, amount); 
    LogTransfer(owner, target, amount);
  }

  /// @notice Freeze the `target` address
  function freezeAccount(address target, bool freeze) public onlyOwner {
    frozenAccounts[target] = freeze;
    LogFrozenAccount(target, freeze);
  }

  /// @notice FreSet the new `newSellPrice` and `newBuyPrice`
  function setPrices(uint256 newSellPrice, uint256 newBuyPrice) public onlyOwner {
    sellPrice = newSellPrice;
    buyPrice = newBuyPrice;
  }

  function buy() payable public returns (uint256 amount) { 
    amount = SafeMath.div(msg.value, buyPrice);
    require(balanceOf[this] >= amount); 
    balanceOf[msg.sender] += amount;
    balanceOf[this] -= amount;

    LogTransfer(this, msg.sender, amount);
    return amount;
  }

  function sell(uint256 amount) public returns (uint256 revenue) {
    require(balanceOf[msg.sender] >= amount);
    balanceOf[this] += amount;
    balanceOf[msg.sender] -= amount;
    revenue = amount * sellPrice;

    // it is importatnt that we run this last to avoid recursive attacks i.e. DAO hack
    // Also make sure the contract have enough ethers so it can actually send ethers to other accounts
    // and the following command doesn't fail
    require(msg.sender.send(revenue)); 
    LogTransfer(msg.sender, this, amount);
    return revenue;
  }

  /// @notice Set the min balance to `minimumBalanceInFinney`
  function setMinBalance(uint256 minimumBalanceInFinney) public onlyOwner {
    minBalanceForAccounts = minimumBalanceInFinney * 1 finney;
  }

  // ICO related code
  event LogICOTxn(address indexed recipient, uint256 amount, uint256 buyPrice);

  function setEndtime(uint256 _endTime) public returns(bool) {
    endTime = _endTime;
  }

  modifier onlyBefore(uint256 _time) {
    require(now <= _time);
    _;
  }

  function () payable public onlyBefore(endTime) {
    createTokens(msg.sender);
  }

  function getICOPrice() public returns(uint256) {
    //TODO: add custom logic based on supply and demand
    // or maybe the current price of ETH
    return 500;
  }

  /// @notice Create 
  function createTokens(address recipient) payable public {
    require(msg.value > 0);

    uint256 currentICOPrice = getICOPrice();
    uint256 tokens = SafeMath.div(SafeMath.mul(msg.value, currentICOPrice), 1 ether);
    supply = SafeMath.add(supply, tokens);
    balanceOf[recipient] = SafeMath.add(balanceOf[recipient], tokens);
    require(owner.send(msg.value));
    LogICOTxn(recipient, tokens, currentICOPrice);
  }
}
