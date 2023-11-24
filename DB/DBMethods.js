//Find

export const find = async ({
  model,
  filter = {},
  populate = [],
  select = "",
  skip = 0,
  limit = 10,
} = {}) => {
  const result = await model
    .find(filter)
    .limit(limit)
    .skip(skip)
    .select(select)
    .populate(populate);
  return result;
};

export const findOne = async ({
  model,
  filter = {},
  populate = [],
  select = "",
} = {}) => {
  const result = await model.findOne(filter).select(select).populate(populate);
  return result;
};

export const findById = async ({
  model,
  filter = {},
  populate = [],
  select = "",
} = {}) => {
  const result = await model.findById(filter).select(select).populate(populate);
  return result;
};

//Update

export const findOneAndUpdate = async ({
  model,
  filter = {},
  data = {},
  options = {},
  select = "",
  populate = [],
} = {}) => {
  const result = await model
    .findOneAndUpdate(filter, data, options)
    .select(select)
    .populate(populate);
  return result;
};

export const findByIdAndUpdate = async ({
  model,
  filter = {},
  data = {},
  options = {},
  select = "",
  populate = [],
} = {}) => {
  const result = await model
    .findByIdAndUpdate(filter, data, options)
    .select(select)
    .populate(populate);
  return result;
};

export const updateOne = async ({ model, filter = {}, data = {} } = {}) => {
  const result = await model.updateOne(filter, data);
  return result;
};

//Delete

export const findOneAndDelete = async ({
  model,
  filter = {},
  data = {},
  select = "",
  populate = [],
} = {}) => {
  const result = await model
    .findOneAndDelete(filter, data)
    .select(select)
    .populate(populate);
  return result;
};

export const findByIdAndDelete = async ({
  model,
  filter = {},
  data = {},
  select = "",
  populate = [],
} = {}) => {
  const result = await model
    .findByIdAndDelete(filter, data)
    .select(select)
    .populate(populate);
  return result;
};

export const deleteOne = async ({ model, filter = {}, data = {} } = {}) => {
  const result = await model.deleteOne(filter, data);
  return result;
};

//create

export const create = async ({
  model,
  data = {},
  select = "",
  populate = [],
} = {}) => {
  const result = await model.create(data);
  return result;
};

export const createAndSave = async ({ model, data = {} } = {}) => {
  const newObj = new model(data);
  const savedObj = await newObj.save();
  return savedObj;
};

export const insertMany = async ({ model, data = [{}] } = {}) => {
  const result = await model.insertMany(data);
  return result;
};
