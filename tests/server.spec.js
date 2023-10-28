const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0);
      });
    
      it("Comprueba que se obtiene un código 404 al intentar eliminar un café con un id queno existe", async () => {
        const response = await request(server).delete("/cafes/9999").set("Authorization", "token");
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("No se encontró ningún cafe con ese id");
      });
    
      it("Agrega un nuevo café y devuelve un código 201", async () => {
        const nuevoCafe = { id: 100, nombre: "Café de prueba" };
        const response = await request(server).post("/cafes").send(nuevoCafe);
        expect(response.status).toBe(201);
      });
    
      it("Devuelve un status code 400 si intentas actualizar uncafé enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
        const response = await request(server).put("/cafes/1").send({ id: 452, nombre: "Café con malicia" });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
      });
});

