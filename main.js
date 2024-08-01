const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");

// ! her adımda console.log(" eylem kontrolü") ile eylem kontrolü yapmamız lazım
// console.log(harcamaInput, fiyatInput, formBtn);
// burada çağırdığımız elamanların kontrolünü yapıyoruz

//todo izleme işlemleri için .addEventListener("işlem",fonksiyon) kullanılır
formBtn.addEventListener("click", addExpense);

//todo silme işlemi için izleme jste yapılacak htmlde yazmadığımız için
liste.addEventListener("click", handleClick);

// todo select değişme olayını izleme
selectFilter.addEventListener("change", handleFilter);

//todo toplam state(durum)
let toplam = 0;

function updateToplam(fiyat) {
  toplam += Number(fiyat);
  toplamBilgi.innerText = toplam;
}

//todo harcama oluşturma

/*  burada hata alıyoruz. Butona tıklandığını kontrol etmek
için console.log yapıyoruz ve tıklanınca sayfa yenileniyor.
Burada karşılaştığımız hatanın sebebi form elemanında özellikten
dolayı oluyor ve çözümü
1- burada fonksiyonun içerisine e yazılır.
2- form etiketinin varsayılan yenileme ayarlarını sıfırlayacağız.
3-e.preventDefault(); özelliği ile özellikleri sıfırlanır. 
 */

function addExpense(e) {
  e.preventDefault();
  //   console.log("Butona Tıklandı");
  //   console.log(harcamaInput.value, fiyatInput.value);

  //todo boş girişleri engellemek için if else yapısını kullanacağız
  if (!fiyatInput.value || !harcamaInput.value || fiyatInput.value < 0) {
    alert("Formları Doldurunuz.");
    return; //  return ile kodları okumayı durduruyoruz.
    // (fiyatInput.value === "") ! ile null,undifined ya da boştur durumlarını ifade ediyor.
  }

  //todo Div Oluşturma document.createElement("");
  const harcamaDiv = document.createElement("div");

  //todo class list ekleme eklenecekEleman.classList.add("className");
  harcamaDiv.classList.add("harcama");

  //todo  checkbox için class eklenir
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }

  //todo içeriğin ayarlanması eklenecekEleman.innerHTML
  //string " " tanımlamalarda birden çok satır yazılamıyor ve js tarafından kodlar yazılamıyor.Bunda dolayı backthickler ` ` kullanılır.
  //htmlde yazdığımız kodu buraya yapıştırıyoruz.
  //burada html statik yazdığımız kısmı js ile ` içerisinde ${eleman.value} kullanarak dinamik hale getirdik.`

  harcamaDiv.innerHTML = `
  <h2>${harcamaInput.value}</h2>
  <h2 id="value">${fiyatInput.value}</h2>
  <div class="buttons">
    <img id="payment" src="/images/pay.png" />
    <img id="remove" src="/images/remove.png" />
  </div>
  `;

  //todo oluşan harcamayı html gönderme icineAtılacakEleman.appendChild("eklenecekEleman") (listeye ekleme)
  liste.appendChild(harcamaDiv);

  //todo form temizlenmeden önce toplam güncellenir.
  updateToplam(fiyatInput.value);

  //todo forma değer girildikten sonra içeriği temizleme
  harcamaInput.value = "";
  fiyatInput.value = "";
}

//todo listeye tıklanma olayını yönetme

function handleClick(e) {
  //   console.log(e.target);
  const element = e.target;
  if (element.id === "remove") {
    // silmek için parentElement ile bir üst kapsayıcıya çıkılır.
    //todo tıklanılan sil butonunun kapsayıcısını alıyoruz
    const wrapperElement = element.parentElement.parentElement;

    // todo silinen elemanın fiyatını çıkarma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;
    Number(deletedPrice);

    // todo silinenin fiyatını toplamdan çıkartma
    updateToplam(-Number(deletedPrice));

    //todo kapsayıcı html kaldırma işlemi
    wrapperElement.remove();
  }
}

// todo filtreleme işlemi
function handleFilter(e) {
  // ebeveynin tüm çocuklarını seçmek için childNotes kullanılır.
  const items = liste.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        // contains dizinin eleman içerip içermediğini kontrol eder.
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
