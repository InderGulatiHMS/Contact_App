
using ContactsApi.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;

namespace ContactsApi.Services
{
    public class ContactService : IContactService
    {
        private readonly string _filePath = "Data/contacts.json";
        private readonly object _lock = new();

        public async Task<IEnumerable<Contact>> GetAllAsync()
        {
            var contacts = await ReadContactsAsync();
            return contacts;
        }

        public async Task<Contact> GetByIdAsync(int id)
        {
            var contacts = await ReadContactsAsync();
            return contacts.FirstOrDefault(c => c.Id == id);
        }

        public async Task<Contact> CreateAsync(Contact contact)
        {
            var contacts = (await ReadContactsAsync()).ToList();

            contact.Id = contacts.Any() ? contacts.Max(c => c.Id) + 1 : 1;

            if (contacts.Any(c => c.Email.ToLower() == contact.Email.ToLower()))
            {
                throw new System.Exception("A contact with the same email already exists.");
            }

            contacts.Add(contact);
            await WriteContactsAsync(contacts);
            return contact;
        }

        public async Task<bool> UpdateAsync(int id, Contact contact)
        {
            var contacts = (await ReadContactsAsync()).ToList();
            var existing = contacts.FirstOrDefault(c => c.Id == id);
            if (existing == null)
                return false;

            if (contacts.Any(c => c.Email.ToLower() == contact.Email.ToLower() && c.Id != id))
            {
                throw new System.Exception("Another contact with the same email already exists.");
            }

            existing.FirstName = contact.FirstName;
            existing.LastName = contact.LastName;
            existing.Email = contact.Email;

            await WriteContactsAsync(contacts);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var contacts = (await ReadContactsAsync()).ToList();
            var contact = contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null)
                return false;

            contacts.Remove(contact);
            await WriteContactsAsync(contacts);
            return true;
        }

        private async Task<IEnumerable<Contact>> ReadContactsAsync()
        {
            if (!File.Exists(_filePath))
            {
                _ = Directory.CreateDirectory(Path.GetDirectoryName(_filePath));
                await File.WriteAllTextAsync(_filePath, "[]");
            }

            var json = await File.ReadAllTextAsync(_filePath);
            return JsonConvert.DeserializeObject<IEnumerable<Contact>>(json);
        }

        private async Task WriteContactsAsync(IEnumerable<Contact> contacts)
        {
            lock (_lock)
            {
                var json = JsonConvert.SerializeObject(contacts, Newtonsoft.Json.Formatting.Indented);
                File.WriteAllText(_filePath, json);
            }
        }
    }
}
