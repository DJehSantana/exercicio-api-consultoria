import { logger } from "../middlewares/logger.js";
import {
  deleteById,
  downloadService,
  getAll,
  getById,
  getByParams,
  save,
  update,
  uploadService,
} from "../services/document.service.js";

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
import AWS from "aws-sdk";

const bucketName = process.env.BUCKET_AWS;
const region = process.env.AWS_DEFAULT_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

export async function createDocument(req, res, next) {
  try {
    const document = await save(req.body);
    res.status(201).json(document);
    logger.info(`POST /document - ${JSON.stringify(document)}`);
  } catch (error) {
    next(error);
  }
}

export async function findAllDocuments(req, res, next) {
  try {
    const response = await getAll();
    res.status(200).json(response);
    logger.info("GET /document - success");
  } catch (error) {
    next(error);
  }
}

export async function findDocumentById(req, res, next) {
  try {
    const response = await getById(req.params.id);
    res.status(200).json(response);
    logger.info(`GET /document - ${JSON.stringify(response)}`);
  } catch (error) {
    next(error);
  }
}

export async function findDocumentsWithParams(req, res, next) {
  try {
    const filter = req.query;

    let documents = await getByParams(filter);

    if (documents) {
      res.status(200).json(documents);
      logger.info(`GET /document - ${JSON.stringify(documents)}`);
    }
  } catch (error) {
    next(error);
  }
}

export async function updateDocument(req, res, next) {
  try {
    const response = await update(req.params.id, req.body);
    res.status(200).json(response);
    logger.info(`PUT /document/:id - ${JSON.stringify(response)}`);
  } catch (error) {
    next(error);
  }
}

export async function deleteDocument(req, res, next) {
  try {
    await deleteById(req.params.id);
    res.status(204).json(null);
    logger.info(`DELETE /document/:id - success`);
  } catch (error) {
    next(error);
  }
}

export async function uploadDocumentS3(req, res, next) {
  try {
    const post = await uploadService(req.file);

    res.status(201).json(post);
    logger.info(`POST /document - ${JSON.stringify(post)}`);
  } catch (error) {
    //res.status(500).send(error.message);
    next(error);
  }
}

export async function downloadDocumentS3(req, res, next) {
  try {
    //Nessa primeira parte é identificado o arquivo que será baixado
    const { id } = req.params;

    //Diretório de destino de download no corpo da requisição
    const { diretorio } = req.body;

    const post = await downloadService(id);
    const { key } = post;

    //Essa configuração é para usar o path, não estava dando certo de outra forma
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    //OBS: esse pathDoc indica o caminho do diretório onde o documento será salvo.
    //Neste caso foi usada uma pasda dentro do servidor, mas isso deverá ser definido dinamicamente com escolha do usuário.
    const pathDoc = path.resolve(__dirname, "..", "..", "tmp", "uploads");

    //Essa é a parte que pega as informações da AWS para identificar o arquivo no bucket
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });
    const s3 = new AWS.S3();
    const options = {
      Bucket: bucketName,
      Key: key,
    };

    //Nessa etapa final são usados o createReadStream e createWriteStream para baixar o arquivo, não entendi bem essa parte. XD
    res.attachment(key);
    const fileStream = s3.getObject(options).createReadStream();
    const writeStream = fs.createWriteStream(
      path.join(diretorio || pathDoc, key)
    );
    fileStream.pipe(writeStream).on("finish", () => {
      return pathDoc;
    });

    console.log(`Downloaded file: ${key}`);
    return res.json({ msg: "Download ok." });
  } catch (error) {
    //res.status(500).send(error.message);
    next(error);
  }
}
