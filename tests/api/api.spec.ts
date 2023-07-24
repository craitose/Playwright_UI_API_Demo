import { test, expect } from "@playwright/test";

test.describe.parallel("API Testing", () => {
const baseUrl = 'https://reqres.in/api'

    test("Simple API test - Assert Response Status", async ({request}) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
        
    })

    test("Simple API test - Assert Invalid Endpoint", async ({request}) => {
        const response = await request.get(`${baseUrl}/users/invalid`)
        expect(response.status()).toBe(404)
    })

    test("GET Request - Get User Detail", async ({request}) =>{
        const response = await request.get(`${baseUrl}/users/1`)
        const responseBody = JSON.parse(await response.text())
        
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe("George")
        expect(responseBody.data.last_name).toBe("Bluth")
        expect(responseBody.data.email).toBeTruthy()
        
    })

    test("POST Request - Create New User", async ({request}) =>{
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                "name": "Arturro",
                "job" : "Analyst"
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.name).toBe("Arturro")
        expect(responseBody.createdAt).toBeTruthy()
        
    })

    test("POST Request - Login", async ({request}) =>{
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        })

        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })

    test("POST Request - Login Fail", async ({request}) =>{
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: "eve.holt@reqres.in",
                
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe("Missing password")
    }) 
    
    test("POST Request - Update User", async ({request}) =>{
        const response = await request.put(`${baseUrl}/users/2`, {
            data: {
                "name": "Angela Bingum",
                "job" : "Manager"
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.job).toBe("Manager")
        expect(responseBody.updatedAt).toBeTruthy()
        console.log(responseBody)
        
    })

    test("DELETE Request - Delete user", async ({request}) => {

        const response = await request.delete(`${baseUrl}/users/2`)
        expect (response.status()).toBe(204)
    })
    
})