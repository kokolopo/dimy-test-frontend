import { useEffect, useState } from "react";
import InputBar from "./components/InputBar.jsx";

function App() {
  const [form, setForm] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");
  const [error0001, setError0001] = useState(false);

  useEffect(() => {
    if (error0001) {
      setTimeout(() => {
        setError0001((x) => (x = false));
      }, 3000);
    }
  }, [error0001]);

  useEffect(() => {
    console.log(error0001);
  }, [error0001]);

  const handleAddNewRow = () => {
    setForm([
      ...form,
      {
        productName: "",
        productPrice: "",
        quantity: "1",
        total: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    console.log(form[index].total);
    setGrandTotal(grandTotal - form[index].total);

    let newForm = [...form].filter((_, i) => i !== index);
    setForm((previousForm) => newForm);
  };

  const handleOnChange = (event, index) => {
    const { value, name } = event.target;

    console.log(value, 666, name);
    if (value < 1 && name == "quantity") {
      return setError0001((value) => (value = true));
    }
    const newForm = [...form];

    // validate if there is 0 on quantity

    newForm[index][name] = value;
    newForm[index]["total"] =
      newForm[index]["productPrice"] * newForm[index]["quantity"];

    const sumTotal = (acc, e) => {
      return acc + e.total;
    };
    const newGrandTotal = newForm.reduce(sumTotal, 0);

    setForm(newForm);
    setGrandTotal((previousGrandTotal) => (previousGrandTotal = newGrandTotal));
  };
  return (
    <div className="App">
      <button
        onClick={() => {
          handleAddNewRow();
        }}
        className="p-3 m-3 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        New
      </button>

      {error0001 && <div>KUANTITAS TIDAK BOLEH KURANG DARI 0!</div>}

      {form.map((element, index) => (
        <div
          className="grid grid-cols-5 justify-content-center align-center"
          key={index}
        >
          <InputBar
            OnChange={handleOnChange}
            Value={form[index].productName}
            Name={"productName"}
            Index={index}
            Label="Product name"
            Type={"text"}
            ClassName={
              "bg-slate-100 border-gray-600 max-w-20 rounded-lg h-12 pl-4"
            }
          />
          <InputBar
            OnChange={handleOnChange}
            Value={form[index].productPrice}
            Name={"productPrice"}
            Index={index}
            Label="Product price"
            Type={"number"}
            ClassName={
              "bg-slate-100 border-gray-600 max-w-20 rounded-lg h-12 pl-4"
            }
          />
          <InputBar
            OnChange={handleOnChange}
            Value={form[index].quantity}
            Name={"quantity"}
            Index={index}
            Label="Qty"
            Type={"number"}
            ClassName={
              "bg-slate-100 border-gray-600 max-w-20 rounded-lg h-12 pl-4"
            }
          />
          <InputBar
            OnChange={handleOnChange}
            Value={form[index].total}
            Name={"total"}
            Index={index}
            Label="Total"
            Type={"number"}
            ClassName={
              "disabled bg-slate-100 border-gray-600 max-w-20 rounded-lg h-12 pl-4"
            }
          />
          {index !== 0 && (
            <button
              className=" p-1 m-5 bg-red-500 rounded-xl hover:bg-red-300 font-bold text-gray-200 border-orange-300"
              onClick={() => {
                handleDeleteRow(index);
              }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
      <div className="grid grid-cols-5">
        <InputBar
          className="col-span-5"
          // OnChange={handleGrandTotalOnChange}
          Value={grandTotal}
          Name={"grandTotal"}
          Label="Grand total"
          Type={"number"}
          ClassName={
            "col-span-5 bg-slate-100 border-gray-600 max-w-20 rounded-lg h-12 pl-4"
          }
        />
      </div>
    </div>
  );
}

export default App;
