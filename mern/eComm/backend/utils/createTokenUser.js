const createTokenUser = (user) => {
  console.log("createTokenUser", user);
  return { name: user.name, userId: user._id, role: user.role, stripe_customer_id: user.stripe_customer_id };
};

module.exports = createTokenUser;
