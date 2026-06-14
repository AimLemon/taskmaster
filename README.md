# Regression Test Suite REST API - TaskMaster

![Regression Test CI](https://github.com/AimLemon/taskmaster/actions/workflows/test.yml/badge.svg)

## Deskripsi Proyek

Repository ini berisi implementasi **Regression Test Suite** pada REST API menggunakan Jest dan Supertest. Pengujian ini bertujuan untuk memastikan bahwa perubahan kode tidak merusak fungsionalitas sistem yang sudah berjalan sebelumnya. Testing difokuskan pada modul Autentikasi dan Validasi User.

## Teknologi yang Digunakan

* **Node.js & Express.js** (Backend Framework)
* **Sequelize & PostgreSQL** (Database & ORM)
* **Jest & Supertest** (Testing Framework)
* **GitHub Actions** (CI/CD Automation)

---

## Cara Menjalankan Project

**1. Clone Repository**
\`\`\`bash
git clone https://github.com/AimLemon/taskmaster.git
\`\`\`

**2. Masuk ke Folder Backend**
\`\`\`bash
cd taskmaster-backend
\`\`\`

**3. Install Dependency**
\`\`\`bash
npm install
\`\`\`

**4. Menjalankan Regression Test**
\`\`\`bash
npm test -- --forceExit
\`\`\`

**5. Menjalankan Test dengan Coverage**
\`\`\`bash
npm test -- --coverage --forceExit
\`\`\`

---

## Implementasi Test Case


<img width="890" height="432" alt="8954b5dc-0080-4f17-ad09-4a4281770b06" src="https://github.com/user-attachments/assets/3bf9c643-943d-4359-9d9b-d6d6705c316d" />
<img width="870" height="334" alt="1 2 Test Case Berhasil" src="https://github.com/user-attachments/assets/dd08f3fe-2ef3-4e9d-9e86-94b00829aa89" />


Regression Test Suite terdiri dari 6 test case komprehensif yang mencakup validasi, registrasi, dan login (skenario error handling).

| Modul | PIC | Deskripsi Test Case | Status |
| :--- | :--- | :--- | :--- |
| **Validation** | Agim | Register gagal jika format email tidak valid (400) | ✅ Passed |
| **Validation** | Agim | Register gagal jika password kurang dari 6 karakter (400) | ✅ Passed |
| **Registration** | Safri | Register gagal jika email sudah terdaftar (400) | ✅ Passed |
| **Registration** | Safri | Register gagal jika confirm password tidak sama (400) | ✅ Passed |
| **Auth/Login** | Adyansyah | Login gagal jika email tidak terdaftar (404) | ✅ Passed |
| **Auth/Login** | Adyansyah | Login gagal jika password tidak cocok (400) | ✅ Passed |

---

## Demonstrasi Regression Testing

Untuk membuktikan regression testing berjalan dengan baik, dilakukan simulasi perubahan kode (merusak kode secara sengaja) pada fungsi `Register` di `UserController.js`. 

<img width="905" height="619" alt="gagal 2 1" src="https://github.com/user-attachments/assets/4a7d47e0-2e64-4980-a8de-7c4749831115" />
<img width="901" height="554" alt="gagal 2 2" src="https://github.com/user-attachments/assets/8cf6d8ec-3df2-4a83-a118-e55595f0107d" />


Validasi kecocokan password dimatikan dengan menjadikannya komentar:
\`\`\`javascript
// if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok!" });
\`\`\`

Setelah pelindung tersebut dihapus, test case **"Safri 2: Register gagal jika confirm password tidak sama"** langsung mengalami kegagalan (*Failing Test*). Hal ini membuktikan bahwa regression test suite berhasil mendeteksi perubahan/bug yang tidak disengaja pada sistem.

---

## Code Coverage

<img width="958" height="444" alt="1 Screenshot Laporan Coverage" src="https://github.com/user-attachments/assets/2c3b16fd-9cea-4ffe-a3d2-0b808a23aae2" />


Coverage diukur menggunakan perintah: `npm test -- --coverage`

| Metric | Hasil |
| :--- | :--- |
| **Statements** | 29.29% |
| **Branches** | 26.92% |
| **Functions** | 10.52% |
| **Lines** | **30.11%** |

*(Catatan: Nilai coverage disesuaikan dengan penerapan metode Bypass Database untuk stabilitas pengujian pada server CI GitHub Actions).*

---

## Integrasi GitHub Actions

<img width="1060" height="220" alt="2 2 Screenshot workflow GitHub Actions berhasil dijalankan" src="https://github.com/user-attachments/assets/7c57e526-9bb8-4cdc-b9cf-f2e931508550" />


Continuous Integration (CI) diimplementasikan menggunakan GitHub Actions. Workflow akan dijalankan secara otomatis setiap kali terjadi `push` ke branch `master`.

**File workflow:** `.github/workflows/test.yml`

Tahapan workflow meliputi:
1. Checkout repository
2. Setup Node.js (v18)
3. Install dependency (`npm install`)
4. Menjalankan Jest Test Suite (`npm test`)
<img width="890" height="432" alt="1 1 Test Case Berhasil " src="https://github.com/user-attachments/assets/89a5166e-8aff-45f1-b280-c6166b62f452" />

---

## Kesimpulan

Regression Test Suite berhasil diimplementasikan menggunakan Jest dan Supertest. Hasil pengujian menunjukkan bahwa:
* Seluruh test case berhasil mendeteksi respons error (400 & 404) dengan akurat.
* Regression bug berhasil dideteksi ketika validasi kecocokan password dihapus.
* GitHub Actions berhasil menjalankan test secara otomatis sebagai gerbang pelindung (CI/CD) setiap kali terjadi perubahan kode pada repository.
