import express from "express";
import axios from "axios";
import ICEP from "../interface";
import * as js2xml from "js2xmlparser";
import converter from "json-2-csv";
const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send(`
    <p>Faça sua pesquisa via CEP (http://localhost:3001/cep/{cep}/{tipo}) ou inserindo o endereço do local (http://localhost:3001/{estado}/{cidade}/{logradouro}/{tipo})</p>
    <p>Use apenas o tipos xml, json e csv (utilizando apenas letras minúsculas) </p>`);
});

routes.get("/cep/:code/:tipo", async (req, res, next) => {
  try {
    const api: ICEP = await axios.get(
      `http://viacep.com.br/ws/${req.params.code}/json/`
    );
    if (req.params.tipo === "json") {
      return res.status(200).json({
        code: 200,
        status: api.statusText,
        data: api.data,
      });
    } else if (req.params.tipo === "xml") {
      const xml = js2xml.parse("Data", api.data);
      res.setHeader("Content-Type", "application/xml");
      res.setHeader("Content-Disposition", "attachment; filename=CEPData.xml");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(xml);
    } else if (req.params.tipo === "csv") {
      converter.json2csv([api.data!], (err, csv) => {
        if (err) {
          console.log(err);
        }
        if (csv) {
          res.setHeader("Content-Type", "application/csv");
          res.setHeader("Content-Disposition", "attachment; filename=CEPData.csv");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(csv);
        }
      });
      next();
    } else {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Insira um tipo válido(json, xml, csv)!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "Bad Request",
      message:
        "Insira o código corretamente(Apenas 8 dígitos, sem espaços e sem letras)!",
    });
  }
});

routes.get("/:estado/:cidade/:logradouro/:tipo", async (req, res, next) => {
  const { estado, cidade, logradouro } = req.params;
  res.locals.uf = estado;
  res.locals.localidade = cidade;
  try {
    const api: ICEP = await axios.get(
      `http://viacep.com.br/ws/${estado}/${cidade}/${logradouro}/json/`
    );
    if (req.params.tipo === "json") {
      return res
        .status(200)
        .json({ code: 200, status: api.statusText, data: api.data });
    } else if (req.params.tipo === "xml") {
      const xml = js2xml.parse("Data", api.data);
      res.setHeader("Content-Type", "application/xml");
      res.setHeader("Content-Disposition", "attachment; filename=CEPData.xml");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(xml);
    } else if (req.params.tipo === "csv") {
      converter.json2csv([api.data!], (err, csv) => {
        if (err) {
          console.log(err);
        }
        if (csv) {
          res.setHeader("Content-Type", "application/csv");
          res.setHeader("Content-Disposition", "attachment; filename=CEPData.csv");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(csv);
        }
      });
      next();
    } else {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Insira um tipo válido!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "Bad Request",
      message: "Insira os dados corretamente!",
    });
  }
});

export default routes;
