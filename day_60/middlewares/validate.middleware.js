const { object } = require("yup");

module.exports = (req, res, next) => {
  req.validate = async (data, rules = {}) => {
    try {
      const schema = object(rules);
      // console.log("schema", schema);
      const body = await schema.validate(data, {
        abortEarly: false,
      });
      return body;
    } catch (e) {
      //Xử lý lỗi
      // console.log("thông báo lỗi", e);
      // console.log("chi tiết", e.inner);
      const errors = Object.fromEntries(
        e.inner.map((item) => [item.path, item.message])
      );

      req.flash("errors", errors);
    }
  };
  //Đưa thông báo lỗi vào trong request.
  const errors = req.flash("errors");
  req.errors = errors.length ? errors[0] : {};
  next();
};
