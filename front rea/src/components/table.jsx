// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { FaTrash, FaPencilAlt, FaCheck } from "react-icons/fa";
import Modify from "./modify";
import Add from "./add";
import Delete from "./delete";

// Table component
const Table = () => {
  const [customers, setCustomers] = useState([]);
  const [showModifyCard, setShowModifyCard] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  // useEffect for fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/customers", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }

        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle customer deletion
  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/customers/${customerId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }
      const updatedCustomers = customers.filter(
        (customer) => customer.id !== customerId
      );
      setCustomers(updatedCustomers);
      setConfirmationMessage("Customer deleted successfully!");
    } catch (error) {
      console.error("Error deleting customer:", error);
      setConfirmationMessage("Failed to delete customer");
    }
  };

  // Function to handle customer modification
  const handleModifyCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowModifyCard(true);
  };

  // Function to handle status change
  const handleStatusChange = (customerId) => {
    console.log("Change status for customer:", customerId);
  };

  // Function to update customer data in the table
  const updateCustomerInTable = (modifiedData) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === selectedCustomer.id
          ? { ...customer, ...modifiedData }
          : customer
      )
    );
  };

  // Function to handle Add button click
  const handleAddClick = () => {
    setShowCard(!showCard);
  };

  return (
    <div className="overflow-auto flex-1 max-h-full">
      {/* Display confirmation message */}
      {confirmationMessage && (
        <div className="bg-green-200 p-3 text-green-800">
          {confirmationMessage}
        </div>
      )}

      {/* Table rendering */}
      <table className="table table-zebra max-h-full">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Name</th>
            <th className="text-center">Address</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <th className="text-center">{customer.id}</th>
              <td className="text-center">{customer.name}</td>
              <td className="text-center">{customer.address}</td>
              <td className="flex items-center justify-around">
                <button
                  className="btn btn-icon btn-ghost"
                  onClick={() => handleModifyCustomer(customer)}
                >
                  <FaPencilAlt />
                </button>
                <Delete onDelete={() => handleDeleteCustomer(customer.id)} />
                {/* <button
                  className="btn btn-icon btn-ghost"
                  onClick={() => handleStatusChange(customer.id)}
                >
                  <FaCheck />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modify card rendering */}
      {showModifyCard && (
        <Modify
          customerData={selectedCustomer}
          modifyCustomer={(modifiedData) => {
            console.log("Modified Customer Data:", modifiedData);
          }}
          setShowCard={setShowModifyCard}
          updateCustomer={updateCustomerInTable}
        />
      )}

      {/* Add button rendering */}
      <div className="flex justify-center items-center flex-grow space-x-12 my-8">
        <button className="btn btn-primary" onClick={handleAddClick}>
          Ajouter
        </button>
      </div>

      {/* Add card rendering */}
      {showCard && (
        <Add setCustomers={setCustomers} setShowCard={setShowCard} />
      )}
    </div>
  );
};

export default Table;
