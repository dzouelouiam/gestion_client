import React, { useState } from "react";

const Add = ({ setCustomers, setShowCard }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddClick = async () => {
    try {
      console.log("Adding customer:", formData);

      const response = await fetch("http://localhost:9090/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Add response:", response);

      if (!response.ok) {
        throw new Error("Failed to add customer");
      }

      const newCustomer = await response.json();
      setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);

      setFormData({
        name: "",
        address: "",
      });

      // Close the card after successfully adding the customer
      setShowCard(false);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleCancelClick = () => {
    // Close the card when cancel is clicked
    setShowCard(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-base-300 bg-opacity-70 flex justify-center items-center">
      <div className="bg-base-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add Customer</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-semibold mb-2">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleAddClick}>
            Ajouter
          </button>
          <button
            className="btn btn-secondary ml-2"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
