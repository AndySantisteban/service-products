const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const cors = require("cors");
const db = require("./db");
const path = require("path");

app.use(bodyParser.json());
app.use(cors());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

app.get("/", function (req, res) {
  res.send("Holiwis!");
});

// app.post("/api/upload", upload.single("image"), (req, res) => {
//   const image = req.image;
//   res.send(apiResponse({ message: "File uploaded successfully.", image }));
// });

app.get("/api/images/:image", function (req, res) {
  const savePath = path.join(__dirname, "../uploads", req.params.image);
  console.log(savePath);
  res.sendFile(path.join(__dirname, "../uploads", req.params.image));
});

app.get("/api/categorias", async function (req, res) {
  const apiResponse = async () => {
    return await db.selectCategorias();
  };
  const category = await apiResponse();
  res.send(category);
});

app.post("/api/categorias", async function (req, res) {
  const apiResponse = async () => {
    return await db.createCategorias(
      req.body.nombre || "",
      req.body.descripcion || ""
    );
  };
  const category = await apiResponse();
  res.send(category);
});

app.get("/api/products", async function (req, res) {
  const apiResponse = async () => {
    return await db.selectProductos();
  };

  const products = await apiResponse();
  res.send(products);
});
app.post("/api/products/delete", async function (req, res) {
  const apiResponse = async () => {
    return await db.deleteProductos(req.body.id);
  };
  const product = await apiResponse();
  res.send(product);
});

app.post("/api/products", upload.single("image"), async function (req, res) {
  const image = req.image;
  const filename = req.file.filename || "";

  const api = async () => {
    return await db.createProductos(
      req.body.nombre,
      req.body.precio,
      req.body.category,
      req.body.stock,
      filename
    );
  };

  api();
  try {
    res.send(apiResponse({ message: "File uploaded successfully.", image }));
  } catch (err) {
    res.status(500).send(err);
  }
});

function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
