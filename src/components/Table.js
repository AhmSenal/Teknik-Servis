import React, { useState } from "react";
import axios from "axios";

const Table = ({
  arizaKayitlari,
  setShowArizaKayitBilgi,
  handleDelete,
  handleEdit,
  showArizaEdit,
  searchable,
  editAriza,
  setArizaKayitlari,
}) => {
  const [search, setSearch] = useState("");

  //const [make, setMake] = useState(false);
  //const [makeContent, setMakeContent] = useState("");

  var filteredData = [];
  filteredData = arizaKayitlari.filter(
    (item) =>
      item.musteriIsim.toLowerCase("TR").includes(search.toLowerCase("TR")) ||
      item.musteriSoyIsim
        .toLowerCase("TR")
        .includes(search.toLowerCase("TR")) ||
      item.musteriTel
        .toString()
        .toLowerCase("TR")
        .includes(search.toLowerCase("TR")) ||
      item.musteriAdres.toLowerCase("TR").includes(search.toLowerCase("TR")) ||
      item.arizaliCihaz.toLowerCase("TR").includes(search.toLowerCase("TR")) ||
      item.ariza.toLowerCase("TR").includes(search.toLowerCase("TR"))
  );

  const handleMake = (item) => {
    //setMake(true);
    //setMakeContent(item.id);
    const newItem = {
      ...item,
      isDone: !item.isDone,
    };
    axios
      .put(`http://localhost:3004/arizaKaydi/${item.id}`, newItem)
      .then((response) => {
        //  const filteredData = arizaKayitlari.filter(
        //    (eleman) => eleman.id !== item.id
        //  );
        //  filteredData.push(newItem);
        //  setArizaKayitlari([...filteredData]);
        console.log(response.data);
        const updatedArray = [];
        for (let i = 0; i < arizaKayitlari.length; i++) {
          if (newItem.id === arizaKayitlari[i].id) {
            updatedArray.push(newItem);
            setArizaKayitlari([...updatedArray]);
          } else {
            updatedArray.push(arizaKayitlari[i]);
            setArizaKayitlari([...updatedArray]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            className="form-control border border-3"
            placeholder="Tabloda ara"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={() => setShowArizaKayitBilgi(false)}
          />
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">İsim</th>
              <th scope="col">Soyisim</th>
              <th scope="col">Telefon</th>
              <th scope="col">Adres</th>
              <th scope="col">Arızalı Cihaz</th>
              <th scope="col">Arıza</th>
              <th scope="col">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.musteriIsim}</td>
                <td>{item.musteriSoyIsim}</td>
                <td>{item.musteriTel}</td>
                <td style={{ maxWidth: "200px" }}>{item.musteriAdres}</td>
                <td>{item.arizaliCihaz}</td>
                <td style={{ maxWidth: "200px" }}>{item.ariza}</td>
                <td>
                  <div className="d-flex flex-column align-items-center">
                    <div className="d-flex">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Sil
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(item)}
                      >
                        {showArizaEdit === true && editAriza === item.id
                          ? "iptal"
                          : "Düzenle"}
                      </button>
                    </div>
                    <button
                      className={`btn btn-sm btn-outline-${
                        item.isDone === true ? "success" : "secondary"
                      }`}
                      style={{ width: "80%" }}
                      onClick={() => handleMake(item)}
                    >
                      {item.isDone === true ? "Gidildi" : "Gidilmedi"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
