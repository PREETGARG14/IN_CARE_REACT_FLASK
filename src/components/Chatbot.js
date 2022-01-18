import React from "react";
import $ from "jquery";

const Chatbot = () => {
  const handleClick = (e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/chatbot",
      data: {
        question: $("#question").val(),
      },
      success: function (result) {
        $("#response").append(
          "<br>Me: " +
            $("#question").val() +
            "<br> HealthBot: " +
            result.response
        );
        $("#question").val("");
      },
      error: function (result) {
        alert("error");
      },
    });
  };
  return (
    <div>
      <h1>Welcome to Aura</h1>
      <br />
      <hr />
      <br />

      <div className="row">
        <div className="col-lg-9">
          <input
            className="form-control"
            type="text"
            name="question"
            id="question"
          />
        </div>
        <div className="col-lg-3">
          <button
            className="button login__submit1"
            id="submit-button"
            onClick={handleClick}
          >
            Send
          </button>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col">
          <p id="response"></p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
