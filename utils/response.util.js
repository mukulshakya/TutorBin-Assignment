exports.badRequest = function (message, data) {
  const resJson = { success: false, message };
  if (data) resJson.data = data;
  return this.status(400).json(resJson);
};

exports.created = function (message, data) {
  const resJson = { success: true, message };
  if (data) resJson.data = data;
  return this.status(201).json(resJson);
};

exports.unexpected = function () {
  return this.status(500).json({ success: false, message: "Unexpected error" });
};

exports.ok = function (data, message) {
  const resJson = { success: true, message: message || "Request successfull" };
  if (data) resJson.data = data;
  return this.status(200).json(resJson);
};
