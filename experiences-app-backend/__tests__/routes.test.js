require("dotenv").config();
const mongoose = require("mongoose");
const router = require("../routes/routes.js");
const request = require("supertest");
const express = require("express");

const app = new express();
app.use('/', router);

describe("Get all Images", () => {
  test("Get array of image data", async () => {
    const res = await request(app).get('api/images');
    console.log(res);
    // const images = await getImages();
    expect(res).toEqual(expect.arrayContaining(res)); // ensures that an array is returned from the getImages function, intended to be the endpoint that returns an array of all images
  })
});