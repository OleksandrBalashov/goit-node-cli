import { program } from "commander";
import actions from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await actions.listContacts();
      console.log(contacts);
      break;
    case "get":
      const contact = await actions.getContactById(id);
      console.log(contact);
      break;
    case "add":
      const newContact = await actions.addContact(name, email, phone);
      console.log(newContact);
      break;
    case "remove":
      const deletedContact = await actions.removeContact(id);
      console.log(deletedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
