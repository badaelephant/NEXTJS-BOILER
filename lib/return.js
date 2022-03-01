export const successjson = (res, data) => {
  return res.status(200).json({
    success: true,
    data,
  });
};
export const errorjson = (res, msg) => {
  return res.status(500).json({
    success: false,
    msg,
  });
};
