require("dotenv").config();
const mongoose = require("mongoose");
const router = require("../routes/routes.js");
const request = require("supertest");
const express = require("express");
const Photo = require('../models/photo');
const {getImages} = request('../routes/routes')

const app = new express();
app.use('/', router);

describe("Get all Images", () => {

  beforeAll(() => {
    Photo.find = jest.fn().mockResolvedValue([{
      "_id": "62685303890952862c5712fd",
		  "id": "8b5e4646-397b-4f2d-9df1-4d9391a8dcf8",
		  "name": "IMG_3837.jpg",
		  "coordinates": [
			  -77.0264,
			  38.8852
		  ]
    }])
  })
  test("Get array of image data", async () => {
    const res = await request(app).get('/api/images');
    expect(res.body).toEqual(expect.arrayContaining(res.body)); // ensures that an array is returned from the getImages function, intended to be the endpoint that returns an array of all images
  })
});