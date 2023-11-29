import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import receptionDeskIcon from "../src/assets/images/reception-desk-icon.png";
import Table from "./components/Table";
import EditTableModal from "./components/EditTableModal";

function App() {
  // Arıza kayıtlarının tutulduğu state
  const [arizaKayitlari, setArizaKayitlari] = useState(null);

  // İşlem türü select menüsü state
  const [selectedOption, setSelectedOption] = useState();

  // Alt işlem türü menüsü states
  const [downSelectedOption, setDownSelectedOption] = useState();
  const [downSelectedOption3, setDownSelectedOption3] = useState();

  // Yeni Arıza Kaydı Oluştur Formunun Stateleri
  const [isim, setIsim] = useState("");
  const [soyisim, setSoyisim] = useState("");
  const [tel, setTel] = useState("");
  const [adres, setAdres] = useState("");
  const [arizaliCihaz, setArizaliCihaz] = useState("");
  const [ariza, setAriza] = useState("");
  const [showArizaKayitBilgi, setShowArizaKayitBilgi] = useState(false);
  const [showArizaKaydiOlusturForm, setShowArizaKaydiOlusturForm] =
    useState(false);
  const [formInputState, setFormInputState] = useState({
    isim: true,
    soyisim: true,
    tel: true,
    adres: true,
    arizaliCihaz: true,
    ariza: true,
  });

  // Arıza Listesi state
  const [showArizaListesi, setShowArizaListesi] = useState(false);
  const [showArizaEdit, setShowArizaEdit] = useState(false);

  // Müşteri Listesi state
  const [musteriListesi, setMusteriListesi] = useState(null);
  const [showMusteriListesi, setShowMusteriListesi] = useState(false);
  const [showMusteriSikayetOneri, setShowMusteriSikayetOneri] = useState(false);
  const [sikayetOneriText, setSikayetOneriText] = useState("");
  const [sikayetOneriler, setSikayetOneriler] = useState("");

  // Arıza Kayıtları Edit
  const [editAriza, setEditAriza] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState("");

  // Veritabanındaki verilerin çekildiği yer. Uygulama açılırken bir kere çalışır.
  useEffect(() => {
    axios
      .get("http://localhost:3004/arizaKaydi")
      .then((response) => {
        console.log("arizaKaydi veritabanından çekilen veri", response.data);
        setArizaKayitlari([...response.data]);
      })
      .catch((error) => {
        console.log("arizaKaydi verileri çekilirken hata oluştu", error);
      });

    axios
      .get("http://localhost:3004/musteriListesi")
      .then((response) => {
        console.log(
          "musteriListesi veritabanından çekilen veri",
          response.data
        );
        setMusteriListesi([...response.data]);
      })
      .catch((error) => {
        console.log("musteriListesi verileri çekilirken hata olustu", error);
      });

    axios
      .get("http://localhost:3004/musteriSikayetOneri")
      .then((response) => {
        setSikayetOneriler(response.data);
      })
      .catch((error) => {
        console.log(
          "musteriSikayetOneri veritabanından veriler çekilirken hata olustu",
          error
        );
      });
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    if (
      isim === "" &&
      soyisim === "" &&
      tel === "" &&
      adres === "" &&
      arizaliCihaz === "" &&
      ariza === ""
    ) {
      alert("Bütün alanlar doldurulmalıdır.");
      return;
    }
    if (isim === "") {
      setFormInputState({
        ...formInputState,
        isim: false,
      });
      return;
    } else if (soyisim === "") {
      setFormInputState({
        ...formInputState,
        soyisim: false,
      });
      return;
    } else if (tel === "") {
      setFormInputState({
        ...formInputState,
        tel: false,
      });
      return;
    } else if (adres === "") {
      setFormInputState({
        ...formInputState,
        adres: false,
      });
      return;
    } else if (arizaliCihaz === "") {
      setFormInputState({
        ...formInputState,
        arizaliCihaz: false,
      });
      return;
    } else if (ariza === "") {
      setFormInputState({
        ...formInputState,
        ariza: false,
      });
      return;
    }

    const newAriza = {
      id: new Date().getTime(),
      musteriIsim: isim,
      musteriSoyIsim: soyisim,
      musteriTel: tel,
      musteriAdres: adres,
      arizaliCihaz: arizaliCihaz,
      ariza: ariza,
      isDone: false,
    };
    axios
      .post("http://localhost:3004/arizaKaydi", newAriza)
      .then((response) => {
        console.log(
          "arizaKayitlari veritabanına yeni kayıt eklenmesi",
          response.data
        );
        setArizaKayitlari([...arizaKayitlari, newAriza]);
        console.log(
          "arizaKayitlari veritabanına yeni kayıt eklenmesi",
          arizaKayitlari
        );
        setShowArizaKayitBilgi(true);
        setIsim("");
        setSoyisim("");
        setTel("");
        setAdres("");
        setArizaliCihaz("");
        setAriza("");

        setFormInputState({
          isim: true,
          soyisim: true,
          tel: true,
          adres: true,
          arizaliCihaz: true,
          ariza: true,
        });
      })
      .catch((error) => {
        console.log("Yeni arıza kaydı hatalı", error);
      });
  };

  const handleReset = () => {
    setIsim("");
    setSoyisim("");
    setTel("");
    setAdres("");
    setArizaliCihaz("");
    setAriza("");
    setShowArizaKayitBilgi(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: new Date().getTime(),
      createdAt: new Date().toLocaleString(),
      message: sikayetOneriText,
    };
    axios
      .post("http://localhost:3004/musteriSikayetOneri", newItem)
      .then((response) => {
        console.log(response.data);
        setSikayetOneriler([...sikayetOneriler, newItem]);
        setSikayetOneriText("");
      })
      .catch((error) => {
        console.log(
          "Müşteri Öneri Şikayet veritabanına kaydedilirken hata oluştu",
          error
        );
      });
  };

  const handleDelete = (itemId) => {
    console.log(itemId);
    setShowArizaKayitBilgi(false);
    axios
      .delete(`http://localhost:3004/arizaKaydi/${itemId}`)
      .then((response) => {
        console.log(response.data);
        const filteredAriza = arizaKayitlari.filter(
          (eleman) => eleman.id !== itemId
        );
        setArizaKayitlari(filteredAriza);
      })
      .catch((error) => {
        console.log(
          "arizaKaydi veritabanından veri silinirken hata oluştu",
          error
        );
      });
  };

  const handleEdit = (item) => {
    setShowArizaEdit(!showArizaEdit);
    setEditAriza(item.id);
    setShowModal(!showModal);
    setModalItem(item);
    setShowArizaKayitBilgi(false);
  };

  const showServiceItems = (e) => {
    if (e === true) {
      setArizaKayitlari(arizaKayitlari.filter((item) => item.isDone === true));
      setShowArizaKayitBilgi(false);
    }

    if (e === false) {
      axios
        .get("http://localhost:3004/arizaKaydi")
        .then((response) => {
          console.log("arizaKaydi veritabanından çekilen veri", response.data);
          setArizaKayitlari([...response.data]);
        })
        .catch((error) => {
          console.log("arizaKaydi verileri çekilirken hata oluştu", error);
        });
      setShowArizaKayitBilgi(false);
    }

    //console.log(e);
    //const showServices = arizaKayitlari.filter((item) => item.isDone === true);
    //console.log("showServices", showServices);
    //setFaultRecords(showServices);
    //console.log("faultRecords", faultRecords);
  };

  const showServiceNotItems = (e) => {
    if (e === true) {
      setArizaKayitlari(arizaKayitlari.filter((item) => item.isDone === false));
      setShowArizaKayitBilgi(false);
    }

    if (e === false) {
      axios
        .get("http://localhost:3004/arizaKaydi")
        .then((response) => {
          console.log("arizaKaydi veritabanından çekilen veri", response.data);
          setArizaKayitlari([...response.data]);
        })
        .catch((error) => {
          console.log("arizaKaydi verileri çekilirken hata oluştu", error);
        });
      setShowArizaKayitBilgi(false);
    }
  };

  // Lifecycle methotlarına göre constructor çalışır sonra bir render'in çalışması gerekir yani bir return çalışması gerekir. Componentin gerçek return'u çalışırsa return içindeki stateler boş olacağı için program hata verir. Hata almamak için aşağıdaki kod bloğunu çalıştırıyoruz. Buradan sonra
  if (arizaKayitlari === null) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container text-center">
      {/* NAVBAR */}
      <div className="row">
        <div className="col mb-3">
          <nav
            className="navbar navbar-expand-lg rounded"
            style={{
              backgroundColor: "#ECEFF1",
            }}
          >
            <div className="container-fluid">
              <a className="navbar-brand" href="#top">
                <img
                  src={receptionDeskIcon}
                  alt=""
                  style={{ height: "50px", marginRight: "10px" }}
                />
                <h3 className="text-primary">TEKNİK SERVİS</h3>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* SELECT MENÜLERİ */}
      <div
        className="row row-cols-2"
        style={{
          backgroundColor: "#EEEEEE",
          paddingTop: "5px",
          borderRadius: "5px",
        }}
      >
        <div className="row w-50">
          <div className="col-12 mb-1">
            <select
              className="form-select"
              aria-label="Default select example"
              name="islem"
              id="islemsecim"
              value={selectedOption}
              onChange={(e) => {
                setShowArizaKaydiOlusturForm(false);
                setShowArizaKayitBilgi(false);
                setShowMusteriListesi(false);
                setShowArizaListesi(false);
                setShowMusteriSikayetOneri(false);
                console.log(e.target.value);
                setSelectedOption(e.target.value);
              }}
            >
              <option value="">İşlem Türü Seçiniz..:</option>
              <option value="arizatespit">1- Arıza Tespit</option>
              <option value="musteri">2- Müşteri Hizmetleri</option>
            </select>
          </div>
          <div className="col-12 mb-3">
            {selectedOption === "arizatespit" && (
              <select
                className="form-select"
                aria-label="Default select example"
                name="islem"
                id="islemsecim"
                value={downSelectedOption}
                onChange={(e) => {
                  setShowArizaKayitBilgi(false);
                  console.log(e.target.value);
                  setDownSelectedOption(e.target.value);
                  e.target.value === "arizakaydiolustur"
                    ? setShowArizaKaydiOlusturForm(true)
                    : setShowArizaKaydiOlusturForm(false);
                  e.target.value === "arizalistesi"
                    ? setShowArizaListesi(true)
                    : setShowArizaListesi(false);
                }}
              >
                <option value="">Alt İşlem Türü Seçiniz..:</option>
                <option value="arizakaydiolustur">
                  1- Arıza Kaydı Oluştur
                </option>
                <option value="arizalistesi">2- Arıza Listesi</option>
              </select>
            )}

            {selectedOption === "musteri" && (
              <select
                className="form-select"
                aria-label="Default select example"
                name="islem"
                id="islemsecim"
                value={downSelectedOption3}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDownSelectedOption3(e.target.value);
                  e.target.value === "musterilistesi"
                    ? setShowMusteriListesi(true)
                    : setShowMusteriListesi(false);
                  e.target.value === "musteritalepsikayetoneri"
                    ? setShowMusteriSikayetOneri(true)
                    : setShowMusteriSikayetOneri(false);
                }}
              >
                <option value="">Alt İşlem Türü Seçiniz..:</option>
                <option value="musterilistesi">1- Müşteri Listesi</option>
                <option value="musteritalepsikayetoneri">
                  2- Müşteri Talep/Şikayet/Öneri
                </option>
              </select>
            )}
          </div>
        </div>
        {showArizaListesi === true && (
          <div className="row w-50">
            <div className="col-6 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={(e) => showServiceItems(e.target.checked)}
                role="switch"
                id="gidilen"
              />
              <label className="form-check-label" htmlFor="gidilen">
                Gidilen Servis Kayıtları Göster
              </label>
            </div>
            <div className="col-6 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={(e) => showServiceNotItems(e.target.checked)}
                role="switch"
                id="gidilmeyen"
              />
              <label className="form-check-label" htmlFor="gidilmeyen">
                Gidilmeyen Servis Kayıtlarını Göster
              </label>
            </div>
          </div>
        )}
      </div>

      {/* YENİ ARIZA KAYDI OLUŞTUR FORMU VE ARIZA LİSTESİ LİSTELEME */}
      <div
        className="row"
        style={{ backgroundColor: "#EEEEEE", padding: "5px" }}
      >
        <div className="col-3">
          {showArizaKaydiOlusturForm === true && (
            <div>
              <form onSubmit={handleForm}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control fw-bold"
                    id="nameInput"
                    placeholder="Name"
                    value={isim}
                    onChange={(e) => setIsim(e.target.value)}
                    onKeyDown={() => setShowArizaKayitBilgi(false)}
                  />
                  <label htmlFor="nameInput">
                    {`İsim `}
                    {formInputState.isim === false && (
                      <span className="text-danger">
                        -bu alan boş bırakılamaz
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control fw-bold"
                    id="surnameInput"
                    placeholder="Surname"
                    value={soyisim}
                    onChange={(e) => setSoyisim(e.target.value)}
                    onKeyDown={() => setShowArizaKayitBilgi(false)}
                  />
                  <label htmlFor="surnameInput">
                    {`Soyisim `}
                    {formInputState.soyisim === false && (
                      <span className="text-danger">
                        -bu alan boş bırakılamaz
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control fw-bold"
                    id="numberInput"
                    placeholder="name@example.com"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    onKeyDown={() => setShowArizaKayitBilgi(false)}
                  />
                  <label htmlFor="numberInput">
                    {`Tel `}
                    {formInputState.tel === false && (
                      <span className="text-danger">
                        -bu alan boş bırakılamaz
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control fw-bold"
                    id="floatingInput"
                    placeholder="Adres"
                    value={adres}
                    onChange={(e) => setAdres(e.target.value)}
                    onKeyDown={() => setShowArizaKayitBilgi(false)}
                  />
                  <label htmlFor="floatingInput">
                    {`Adres `}
                    {formInputState.adres === false && (
                      <span className="text-danger">
                        -bu alan boş bırakılamaz
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control fw-bold"
                    id="floatingInput"
                    placeholder="Arızalı Cihaz"
                    value={arizaliCihaz}
                    onChange={(e) => setArizaliCihaz(e.target.value)}
                    onKeyDown={() => setShowArizaKayitBilgi(false)}
                  />
                  <label htmlFor="floatingInput">
                    {`Arızalı Cihaz `}
                    {formInputState.arizaliCihaz === false && (
                      <span className="text-danger">
                        -bu alan boş bırakılamaz
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control fw-bold"
                    id="floatingInput"
                    placeholder="Ariza"
                    value={ariza}
                    onChange={(e) => setAriza(e.target.value)}
                    onKeyDown={() => setShowArizaKayitBilgi(false)}
                  />
                  <label htmlFor="floatingInput">
                    {`Arıza `}
                    {formInputState.ariza === false && (
                      <span className="text-danger">
                        -bu alan boş bırakılamaz
                      </span>
                    )}
                  </label>
                </div>
                <div className="arizakaydibuttons mb-2">
                  <button
                    type="submit"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Kaydet
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleReset}
                  >
                    Temizle
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setShowArizaKaydiOlusturForm(false)}
                    onKeyDown={() => setShowArizaKayitBilgi(false)}
                  >
                    Vazgeç
                  </button>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => setShowArizaListesi(!showArizaListesi)}
                    role="switch"
                    id="arizalistesi"
                  />
                  <label className="form-check-label" htmlFor="arizalistesi">
                    Servis Kayıtlarını Göster
                  </label>
                </div>
              </form>
              <div className="arizaKayitBilgiDiv">
                {showArizaKayitBilgi === true && (
                  <p id="arizakaydibilgi">
                    Arıza kaydı başarıyla kaydedilmiştir..
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="col-9">
          {showArizaListesi === true && (
            <Table
              arizaKayitlari={arizaKayitlari}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              showArizaEdit={showArizaEdit}
              searchable={true}
              setShowArizaEdit={setShowArizaEdit}
              editAriza={editAriza}
              setShowArizaKayitBilgi={setShowArizaKayitBilgi}
              setArizaKayitlari={setArizaKayitlari}
            />
          )}
        </div>
      </div>

      {/* MÜŞTERİ LİSTESİ VE MÜŞTERİ ŞİKAYET ÖNERİ LİSTESİ VE FORMU */}
      <div className="row">
        <div className="col">
          {showMusteriListesi === true && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">İsim</th>
                  <th scope="col">Soyisim</th>
                  <th scope="col">Telefon</th>
                  <th scope="col">Adres</th>
                </tr>
              </thead>
              <tbody>
                {musteriListesi.map((item) => (
                  <tr key={item.musteriId}>
                    <th scope="row">{item.musteriId}</th>
                    <td>{item.musteriIsim}</td>
                    <td>{item.musteriSoyisim}</td>
                    <td>{item.musteriTel}</td>
                    <td>{item.musteriAdres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          {showMusteriSikayetOneri === true && (
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-2">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="comments"
                  style={{ height: "100%" }}
                  value={sikayetOneriText}
                  onChange={(e) => setSikayetOneriText(e.target.value)}
                ></textarea>
                <label for="comments">Comments</label>
              </div>
              <button className="btn btn-primary" type="submit">
                Kaydet
              </button>
            </form>
          )}
        </div>
        <div className="col-8">
          {showMusteriSikayetOneri === true && (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Mesaj</th>
                  <th scope="col">Oluşturulma Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {sikayetOneriler.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td
                      style={{
                        maxWidth: "30%",
                        maxHeight: "5%",
                        overflowY: "initial",
                      }}
                    >
                      {item.message}
                    </td>
                    <td>{item.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal === true && (
        <EditTableModal
          modalItem={modalItem}
          arizaKayitlari={arizaKayitlari}
          setArizaKayitlari={setArizaKayitlari}
          setShowModal={setShowModal}
          setShowArizaEdit={setShowArizaEdit}
          setEditAriza={setEditAriza}
          showArizaEdit={showArizaEdit}
          setModalItem={setModalItem}
          showModal={showModal}
        />
      )}
    </div>
  );
}

export default App;
