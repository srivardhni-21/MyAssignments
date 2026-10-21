import dotenv from "dotenv";
import path from "path";
import { test, expect } from "@playwright/test";

// Load .env from utils/data folder
dotenv.config({
  path: path.resolve(process.cwd(), "utils", "data", ".env"),
});

test.describe.serial("ServiceNow Change Request CRUD", () => {
  let accessToken: string;
  let systemId: string;

  const tokenURL = process.env.SNOW_TOKEN_URL;
  const changeURL = process.env.SNOW_CHANGE_REQUEST_URL;

  test("1. Generate Bearer Token", async ({ request }) => {
    console.log("Token URL:", tokenURL);
    console.log("Username loaded:", !!process.env.SNOW_USERNAME);
    console.log("Password loaded:", !!process.env.SNOW_PASSWORD);
    console.log("Client ID loaded:", !!process.env.SNOW_CLIENT_ID);
    console.log("Client Secret loaded:", !!process.env.SNOW_CLIENT_SECRET);

    // Check whether required environment variables exist
    expect(tokenURL, "SNOW_TOKEN_URL is missing in .env").toBeTruthy();
    expect(changeURL, "SNOW_CHANGE_REQUEST_URL is missing in .env").toBeTruthy();
    expect(process.env.SNOW_USERNAME).toBeTruthy();
    expect(process.env.SNOW_PASSWORD).toBeTruthy();
    expect(process.env.SNOW_CLIENT_ID).toBeTruthy();
    expect(process.env.SNOW_CLIENT_SECRET).toBeTruthy();

    const tokenResponse = await request.post(tokenURL!, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        grant_type: "password",
        client_id: process.env.SNOW_CLIENT_ID!,
        client_secret: process.env.SNOW_CLIENT_SECRET!,
        username: process.env.SNOW_USERNAME!,
        password: process.env.SNOW_PASSWORD!,
      },
    });

    const tokenBody = await tokenResponse.json();

    if (!tokenResponse.ok()) {
      console.log("Token status:", tokenResponse.status());
      console.log("Token error:", tokenBody.error);
      console.log("Error description:", tokenBody.error_description);
    }

    expect(tokenResponse.status()).toBe(200);
    expect(tokenBody.access_token).toBeTruthy();

    accessToken = tokenBody.access_token;
  });

  test("2. Create Change Request", async ({ request }) => {
    const response = await request.post(changeURL!, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        short_description: "Playwright Change Request",
        description: "Created using Playwright API testing",
        justification: "Testing Change Request API",
        risk: "3",
        impact: "3",
      },
    });

    const body = await response.json();

    if (!response.ok()) {
      console.log("Create status:", response.status());
      console.log("Create error:", body);
    }

    expect(response.status()).toBe(201);
    expect(body.result.sys_id).toBeTruthy();

    systemId = body.result.sys_id;
  });

  test("3. Read Change Request", async ({ request }) => {
    const response = await request.get(`${changeURL}/${systemId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.result.sys_id).toBe(systemId);
  });

  test("4. Update Change Request using PUT", async ({ request }) => {
    const response = await request.put(`${changeURL}/${systemId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        short_description: "Updated Playwright Change Request",
        description: "Updated using PUT API",
        justification: "Testing PUT operation",
        risk: "2",
        impact: "2",
      },
    });

    expect(response.status()).toBe(200);
  });

  test("5. Partially Update Change Request using PATCH", async ({ request }) => {
    const response = await request.patch(`${changeURL}/${systemId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        short_description: "Patched Playwright Change Request",
      },
    });

    expect(response.status()).toBe(200);
  });

  test("6. Delete Change Request", async ({ request }) => {
    const response = await request.delete(`${changeURL}/${systemId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    expect(response.status()).toBe(204);
  });
});
