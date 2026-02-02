// ================================
// عناصر من الـ HTML
// ================================
const productsContainer = document.querySelector(".products-container");
const addBtn = document.querySelector(".add-product button");

// ================================
// جلب المنتجات من localStorage
// ================================
let products = JSON.parse(localStorage.getItem("products")) || [];

// ================================
// رسم المنتجات
// ================================
function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.className =
      "single-product-card animation-product-card";

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <span>${product.price}$/${product.unit}</span>

      <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // زر حذف
    productCard
      .querySelector(".delete-btn")
      .addEventListener("click", () => {
        deleteProduct(index);
      });

    // زر تعديل
    productCard
      .querySelector(".edit-btn")
      .addEventListener("click", () => {
        editProduct(index);
      });

    productsContainer.appendChild(productCard);
  });
}

// ================================
// إضافة منتج
// ================================
addBtn.addEventListener("click", () => {
  const name = prompt("Product name:");
  if (!name) return;

  const price = prompt("Price:");
  if (!price) return;

  const unit = prompt("Unit (kg / pic / liter):");
  if (!unit) return;

  const image = prompt("Image path (example: img/1.jpg):");
  if (!image) return;

  const newProduct = {
    name,
    price,
    unit,
    image,
  };

  products.push(newProduct);
  saveAndRender();
});

// ================================
// حذف منتج
// ================================
function deleteProduct(index) {
  const confirmDelete = confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  products.splice(index, 1);
  saveAndRender();
}

// ================================
// تعديل منتج
// ================================
function editProduct(index) {
  const product = products[index];

  const name = prompt("Edit name:", product.name);
  if (!name) return;

  const price = prompt("Edit price:", product.price);
  if (!price) return;

  const unit = prompt("Edit unit:", product.unit);
  if (!unit) return;

  const image = prompt("Edit image path:", product.image);
  if (!image) return;

  products[index] = {
    name,
    price,
    unit,
    image,
  };

  saveAndRender();
}

// ================================
// حفظ + إعادة عرض
// ================================
function saveAndRender() {
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

// ================================
// تشغيل أولي
// ================================
renderProducts();
