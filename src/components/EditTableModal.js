import React, { useState } from "react";
import "../assets/css/EditTableModal.css";
import axios from "axios";

const EditTableModal = ({
  modalItem,
  arizaKayitlari,
  setArizaKayitlari,
  setShowModal,
  setShowArizaEdit,
  setEditAriza,
  showArizaEdit,
}) => {
  const [musteriName, setMusteriName] = useState(modalItem.musteriIsim);
  const [musteriSurname, setMusteriSurname] = useState(
    modalItem.musteriSoyIsim
  );
  const [musteriTelefon, setMusteriTelefon] = useState(modalItem.musteriTel);
  const [musteriAdresi, setMusteriAdresi] = useState(modalItem.musteriAdres);
  const [musteriArizaliCihaz, setMusteriArizaliCihaz] = useState(
    modalItem.arizaliCihaz
  );
  const [musteriAriza, setMusteriAriza] = useState(modalItem.ariza);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedItem = {
      ...modalItem,
      musteriIsim: musteriName,
      musteriSoyIsim: musteriSurname,
      musteriTel: musteriTelefon,
      musteriAdres: musteriAdresi,
      arizaliCihaz: musteriArizaliCihaz,
      ariza: musteriAriza,
    };
    axios
      .put(`http://localhost:3004/arizaKaydi/${modalItem.id}`, updatedItem)
      .then((response) => {
        console.log(response.data);
        // const filteredData = arizaKayitlari.filter(
        //   (item) => item.id !== modalItem.id
        // );
        // filteredData.push(updatedItem);
        // setArizaKayitlari([...filteredData]);
        const updatedArray = [];
        for (let i = 0; i < arizaKayitlari.length; i++) {
          if (updatedItem.id === arizaKayitlari[i].id) {
            updatedArray.push(updatedItem);
          } else {
            updatedArray.push(arizaKayitlari[i]);
          }
        }
        setArizaKayitlari(updatedArray);
        setEditAriza("");
        setShowArizaEdit(!showArizaEdit);
        setShowModal(false);
      })
      .catch((error) => {
        console.log("Müşteri bilgileri güncellerken hata oluştu", error);
      });
  };

  const handleReset = () => {
    setMusteriName("");
    setMusteriSurname("");
    setMusteriTelefon("");
    setMusteriAdresi("");
    setMusteriArizaliCihaz("");
    setMusteriAriza("");
  };

  return (
    <div className="main">
      <div className="formEdit">
        <form onSubmit={handleSave}>
          <h4 className="text-primary">BİLGİLERİ DÜZENLE</h4>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="Name"
              value={musteriName}
              onChange={(e) => setMusteriName(e.target.value)}
            />
            <label htmlFor="nameInput">İsim</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="surnameInput"
              placeholder="Surname"
              value={musteriSurname}
              onChange={(e) => setMusteriSurname(e.target.value)}
            />
            <label htmlFor="surnameInput">Soyisim</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="numberInput"
              placeholder="name@example.com"
              value={musteriTelefon}
              onChange={(e) => setMusteriTelefon(e.target.value)}
            />
            <label htmlFor="numberInput">Telefon</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Adres"
              value={musteriAdresi}
              onChange={(e) => setMusteriAdresi(e.target.value)}
            />
            <label htmlFor="floatingInput">Adres</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Arızalı Cihaz"
              value={musteriArizaliCihaz}
              onChange={(e) => setMusteriArizaliCihaz(e.target.value)}
            />
            <label htmlFor="floatingInput">Arızalı Cihaz</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Ariza"
              value={musteriAriza}
              onChange={(e) => setMusteriAriza(e.target.value)}
            />
            <label htmlFor="floatingInput">Arıza</label>
          </div>

          <div className="arizakaydibuttons mb-2">
            <button type="submit" className="btn btn-sm btn-primary">
              Kaydet
            </button>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={handleReset}
            >
              Temizle
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => {
                setShowModal(false);
                setEditAriza("");
                setShowArizaEdit(!showArizaEdit);
              }}
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTableModal;
