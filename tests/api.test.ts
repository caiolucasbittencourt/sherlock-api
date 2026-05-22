import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";

const app = createApp();

describe("Sherlock Holmes API", () => {
  it("returns health information", async () => {
    const response = await request(app).get("/api/v1/health").expect(200);

    expect(response.body).toMatchObject({
      status: "healthy",
      version: "1.0.0",
    });
    expect(response.body.timestamp).toEqual(expect.any(String));
    expect(response.body.uptime).toEqual(expect.any(Number));
  });

  it("returns a random quote", async () => {
    const response = await request(app)
      .get("/api/v1/quotes/random")
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      id: expect.any(String),
      text: expect.any(String),
      character: expect.any(String),
      book: expect.any(String),
      year: expect.any(Number),
    });
    expect(response.body.meta).toMatchObject({
      timestamp: expect.any(String),
      version: "1.0.0",
    });
  });

  it("returns all cases", async () => {
    const response = await request(app).get("/api/v1/cases").expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      type: expect.stringMatching(/^(Novel|Short Story)$/),
      year: expect.any(Number),
      description: expect.any(String),
    });
  });

  it("filters cases by type", async () => {
    const response = await request(app)
      .get("/api/v1/cases")
      .query({ type: "Novel" })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "Novel",
        }),
      ]),
    );
    expect(
      response.body.data.every(
        (item: { type: string }) => item.type === "Novel",
      ),
    ).toBe(true);
  });

  it("rejects invalid case filters", async () => {
    const response = await request(app)
      .get("/api/v1/cases")
      .query({ type: "Play" })
      .expect(400);

    expect(response.body).toMatchObject({
      success: false,
      data: [],
    });
  });

  it("returns all characters", async () => {
    const response = await request(app).get("/api/v1/characters").expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      role: expect.any(String),
      description: expect.any(String),
    });
  });

  it("searches quotes by query", async () => {
    const response = await request(app)
      .get("/api/v1/search")
      .query({ q: "impossible" })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      query: "impossible",
      totalResults: expect.any(Number),
      quotes: expect.any(Array),
    });
    expect(response.body.data.totalResults).toBe(
      response.body.data.quotes.length,
    );
    expect(response.body.data.totalResults).toBeGreaterThan(0);
  });

  it("rejects search requests without a query", async () => {
    const response = await request(app).get("/api/v1/search").expect(400);

    expect(response.body).toMatchObject({
      success: false,
      data: {
        quotes: [],
        totalResults: 0,
        query: "",
      },
    });
  });

  it("returns 404 for unknown routes", async () => {
    const response = await request(app).get("/api/v1/unknown").expect(404);

    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Route GET /api/v1/unknown not found",
      },
    });
  });
});
