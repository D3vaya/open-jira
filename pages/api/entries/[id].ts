import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El id no es valido " + id });
  }
  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);

    default:
      return res.status(400).json({ message: "Método no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "no hay entradas con ese id " + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    return res.status(200).json(updatedEntry!);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: "bad request" });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const entry = await Entry.findById(id);
  await db.disconnect();

  if (!entry) {
    return res
      .status(400)
      .json({ message: "no hay entradas con ese id " + id });
  }
  return res.status(200).json(entry!);
};
