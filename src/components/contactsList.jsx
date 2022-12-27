import React, { useState } from "react";
import useGetState from "../hooks/useGetState";
import useGetAsyncActions from "../hooks/useGetAsyncActions";

function ContactsList({
  contacts,
  contactsQuery,
  getUserConversations,
  unslideBar,
}) {
  const [contactId, setContactId] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState(null);
  const [addingContact, setAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [deletingContact, setDeletingContact] = useState(false);
  const [contactOptions, setContactOptions] = useState(false);
  const [contactIndex, setContactIndex] = useState(null);
  const { generalError, generalSuccess } = useGetState();

  const addContact = async (e) => {
    e.preventDefault();

    const contactObj = { name: contactName, phone: contactPhone };
    if (!editingContact) {
      saveContactAsync(contactObj);
    } else {
      contactObj["_id"] = contactId;
      updateContactAsync(contactObj);
    }
  };

  const { deleteContactAsync, updateContactAsync, saveContactAsync } =
    useGetAsyncActions();
  return (
    <div className="contacts_sideBar">
      <div className="contacts_sideBar_list">
        {contacts
          .filter(
            (contact) =>
              contact.name.toLowerCase().includes(contactsQuery) ||
              contact.phone.includes(contactsQuery)
          )
          .map((contact, index) => {
            return (
              <div key={index}>
                <div
                  className="conversations_sideBar_list_item contacts_list_item"
                  onMouseEnter={() => {
                    setContactOptions(true);
                    setContactIndex(index);
                    setDeletingContact(false);
                  }}
                  onMouseLeave={() => setContactOptions(false)}
                >
                  <div className="list_item_avatar">
                    <img src="https://www.pngmart.com/files/21/Account-User-PNG-Clipart.png"></img>
                  </div>

                  <div className="list_item_details">
                    <h3>{contact.name}</h3>
                    <p>{contact.phone}</p>
                  </div>
                  {contactOptions && index === contactIndex && (
                    <div className="list_item_contact_options">
                      <ul>
                        <li
                          onClick={() => {
                            getUserConversations(contact.phone);
                            unslideBar();
                          }}
                        >
                          Message
                        </li>
                        <li
                          onClick={() => {
                            setContactId(contact._id);
                            setContactName(contact.name);
                            setContactPhone(contact.phone);
                            setEditingContact(true);
                            setDeletingContact(false);
                          }}
                        >
                          Edit
                        </li>
                        <li onClick={() => setDeletingContact(true)}>Delete</li>
                      </ul>
                    </div>
                  )}
                </div>
                {deletingContact && index === contactIndex && (
                  <div className="contacts_delete">
                    <p>Are you sure you want to delete {contact.name} ?</p>
                    <button
                      onClick={() => {
                        deleteContactAsync(contact._id);
                        setDeletingContact(false);
                      }}
                    >
                      Yes
                    </button>
                    <button onClick={() => setDeletingContact(false)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {addingContact || editingContact ? (
        <div className="contacts_add_contact_form">
          <p
            onClick={() => {
              editingContact
                ? setEditingContact(false)
                : setAddingContact(!addingContact);
            }}
            className="contact_form_close_btn"
          >
            X
          </p>
          <h3>{`${editingContact ? "Edit" : "Add New"} Contact`}</h3>

          <form>
            <div>
              <label for="name">Contact's Name</label>
              <input
                type="text"
                id="name"
                name="user_name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>
            <div>
              <label for="phone">Contact's Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="user_phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
            <button
              onClick={(e) => addContact(e)}
              disabled={!contactPhone || !contactName}
            >
              {`${editingContact ? "Update" : "Add"} contact`}
            </button>
            {editingContact && (
              <p
                onClick={() => {
                  setContactPhone("");
                  setContactName("");
                  setAddingContact(true);
                  setEditingContact(false);
                }}
                className="contacts_reset_btn"
              >
                Reset Form
              </p>
            )}
          </form>
        </div>
      ) : null}
      <button
        className="contacts_add_btn"
        onClick={() => {
          editingContact
            ? setEditingContact(false)
            : setAddingContact(!addingContact);
        }}
      >
        +
      </button>
      {generalError ||
        (generalSuccess && (
          <div className={`feedback ${generalError ? "error" : "success"}`}>
            <p>{generalError || generalSuccess}</p>
          </div>
        ))}
    </div>
  );
}

export default ContactsList;
