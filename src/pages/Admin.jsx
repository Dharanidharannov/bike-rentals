import React, { useReducer, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import useFetch from "../hooks/useFetch";
import "./Admin.css";

const bikeReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        bikes: action.payload,
      };

    case "ADD_BIKE":
      return {
        ...state,
        bikes: [...state.bikes, action.payload],
      };

    case "DELETE_BIKE":
      return {
        ...state,
        bikes: state.bikes.filter(
          (bike) => bike.id !== action.payload
        ),
      };

    case "UPDATE_BIKE":
      return {
        ...state,
        bikes: state.bikes.map((bike) =>
          bike.id === action.payload.id
            ? action.payload
            : bike
        ),
      };

    default:
      return state;
  }
};

const initialState = {
  bikes: [],
};

function Admin() {
  const { theme } = useContext(AppContext);

  const { data: fetchedBikes, loading } = useFetch(
    "http://localhost:5000/bikes"
  );

  const [state, dispatch] = useReducer(
    bikeReducer,
    initialState
  );

  const [newBike, setNewBike] = useState({
    name: "",
    type: "",
    price: "",
    image: "🚲",
    available: true,
  });

  useEffect(() => {
    if (fetchedBikes) {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: fetchedBikes,
      });
    }
  }, [fetchedBikes]);

  // ADD BIKE
  const handleAddBike = async (e) => {
    e.preventDefault();

    try {
      const bike = {
        ...newBike,
        price: Number(newBike.price),
        available: true,
      };

      const res = await axios.post(
        "http://localhost:5000/bikes",
        bike
      );

      dispatch({
        type: "ADD_BIKE",
        payload: res.data,
      });

      setNewBike({
        name: "",
        type: "",
        price: "",
        image: "🚲",
        available: true,
      });

      alert("Bike Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE BIKE
  const handleDeleteBike = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/bikes/${id}`
      );

      dispatch({
        type: "DELETE_BIKE",
        payload: id,
      });

      alert("Bike Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // PATCH BIKE
  const toggleAvailability = async (bike) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/bikes/${bike.id}`,
        {
          available: !bike.available,
        }
      );

      dispatch({
        type: "UPDATE_BIKE",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`admin-container ${theme}`}>
      <h1>Admin Dashboard</h1>

      <div className="admin-content">
        {/* FORM */}
        <div className="admin-form">
          <h2>Add Bike</h2>

          <form onSubmit={handleAddBike}>
            <input
              type="text"
              placeholder="Bike Name"
              value={newBike.name}
              onChange={(e) =>
                setNewBike({
                  ...newBike,
                  name: e.target.value,
                })
              }
              required
            />

            <select
              value={newBike.type}
              onChange={(e) =>
                setNewBike({
                  ...newBike,
                  type: e.target.value,
                })
              }
              required
            >
              <option value="">Select Type</option>
              <option value="mountain">
                Mountain
              </option>
              <option value="city">City</option>
              <option value="sports">
                Sports
              </option>
              <option value="electric">
                Electric
              </option>
            </select>

            <input
              type="number"
              placeholder="Price"
              value={newBike.price}
              onChange={(e) =>
                setNewBike({
                  ...newBike,
                  price: e.target.value,
                })
              }
              required
            />

            <select
              value={newBike.image}
              onChange={(e) =>
                setNewBike({
                  ...newBike,
                  image: e.target.value,
                })
              }
            >
              <option value="🚲">🚲</option>
              <option value="🚵">🚵</option>
              <option value="🏍️">🏍️</option>
              <option value="⚡">⚡</option>
              <option value="🛵">🛵</option>
            </select>

            <button type="submit">
              Add Bike
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="admin-list">
          <h2>
            Bikes ({state.bikes.length})
          </h2>

          {loading ? (
            <h3>Loading...</h3>
          ) : (
            state.bikes.map((bike) => (
              <div
                className="admin-bike-item"
                key={bike.id}
              >
                <span>
                  {bike.image} {bike.name}
                </span>

                <span>{bike.type}</span>

                <span>
                  ₹{bike.price}/day
                </span>

                <span>
                  {bike.available
                    ? "✅ Available"
                    : "❌ Unavailable"}
                </span>

                <button
                  onClick={() =>
                    toggleAvailability(bike)
                  }
                >
                  Toggle
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDeleteBike(bike.id)
                  }
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;