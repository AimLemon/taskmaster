import request from 'supertest';
import app from '../index.js';
import db from '../config/database.js';

describe('Unit Testing Modul Auth - TaskMaster Project', () => {

    // --- UNIT TEST 1: ADYANSYAH ---
    // Skenario: Memastikan sistem menolak email yang tidak terdaftar
    test('Test Adyansyah: Login harus gagal jika email tidak terdaftar', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'tidakada@gmail.com',
                password: 'password123'
            });
        expect(res.statusCode).toBe(404);
        expect(res.body.msg).toBe("Email tidak terdaftar");
    });

    // --- UNIT TEST 2: SAFRI ---
    // Skenario: Memastikan sistem menolak jika password salah (Case Sensitive Fix)
    test('Test Safri: Login harus gagal jika password salah', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'ady@gmail.com', 
                password: 'salahpassword'
            });
        expect(res.statusCode).toBe(400); 
        expect(res.body.msg).toBe("Password salah"); 
    });

    // --- UNIT TEST 3: AGIM ---
    // Skenario: Memastikan sistem memberikan respon error jika input kosong
    test('Test Agim: Login harus gagal jika input kosong', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: '',
                password: ''
            });
        // Memastikan status code bukan 200 (berhasil)
        expect(res.statusCode).not.toBe(200);
    });

});

afterAll(async () => {
    await db.close();
});