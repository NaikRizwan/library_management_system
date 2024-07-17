const express = require("express");
const cors = require("cors");
const mongoose = require("./db");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000; // You can change this port

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const path = require("path"); // Add this line to import the 'path' module

// const whitelist = ["http://localhost:3002/"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors());

dotenv.config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(require("./routes/auth"));
// app.use(express.static(path.join(__dirname, "../reactfirst", "build")));

// // Handle any other routes and serve the React index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../reactfirst", "build", "index.html"));
// });
const Product = require("./models/Product");
const SingleProduct = require("./models/SingleProduct");

app.get("/api/data", async (req, res) => {
  try {
    const id = req.query.id;

    if (id) {
      const productDetail = await SingleProduct.findOne({ id: id });

      if (productDetail) {
        const products = await Product.find();
        const productFromProducts = products.find((item) => item.id === id);

        if (productFromProducts) {
          // Combine data from productDetail and productFromProducts to construct the response
          const formattedProduct = {
            id: productDetail.id,
            name: productFromProducts.name,
            company: productFromProducts.company,
            price: productFromProducts.price,
            colors: productFromProducts.colors,
            image: productDetail.image.map((img, index) => ({
              id: `randomid${index + 1}`,
              width: img.width,
              height: img.height,
              url: img.url,
              filename: `prod-${index + 1}.png`,
              size: img.size,
              type: img.type,
            })),
            description: productFromProducts.description,
            category: productFromProducts.category,
            featured: productFromProducts.featured,
            stock: productDetail.stock,
            reviews: productDetail.reviews,
            stars: productDetail.stars,
          };

          res.json(formattedProduct);
        } else {
          res.status(404).json({ error: "Product not found in 'products'" });
        }
      } else {
        res.status(404).json({ error: "Product not found in 'productDetail'" });
      }
    } else {
      const products = await Product.find();
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
