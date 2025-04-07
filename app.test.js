// app.test.js
const request = require("supertest");
const app = require("./app");
const { data } = require("./data");
const { default: mongoose } = require("mongoose");

describe("CRUD", () => {
  let createdRecipeId;
  let params = "говядина";

  // Тест для создания рецепта
  it("должен создать рецепт", async () => {
    const res = await request(app).post("/api/recipes/add").send(data);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("recipe._id");
    expect(res.body.recipe.title).toBe("борщ с говядиной");

    createdRecipeId = res.body.recipe._id;
    console.log(createdRecipeId);
  });

  // Тест для получения всех рецептов
  it("получение всех рецептов", async () => {
    const res = await request(app).get("/api/recipes");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Тест для получения рецепта по id
  it("получение рецепта по айди", async () => {
    const res = await request(app).get(`/api/recipes/get/${createdRecipeId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("борщ с говядиной");
  });

  // Тест для поиска рецепта
  it("получение поиска рецепта", async () => {
    const res = await request(app).get(`/api/recipes/search?params=${params}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Тест для обновления рецепта
  it("обновление рецепта", async () => {
    const res = await request(app)
      .put(`/api/recipes/edit?id=${createdRecipeId}`)
      .send(data);

    //expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Рецепт успешно изменен");
    expect(res.body.recipes.title).toBe("борщ с говядиной");
  });

  // Тест для удаления рецепта
  it("удаление рецепта", async () => {
    const res = await request(app).delete(
      `/api/recipes/delete/${createdRecipeId}`
    );
    expect(res.statusCode).toEqual(204);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
