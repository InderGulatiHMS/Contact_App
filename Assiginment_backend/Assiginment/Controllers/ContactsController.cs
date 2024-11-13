
using ContactsApi.Models;
using ContactsApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _service;

        public ContactsController(IContactService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var contacts = await _service.GetAllAsync();
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var contact = await _service.GetByIdAsync(id);
            if (contact == null)
                return NotFound(new { Message = $"Contact with ID {id} not found." });

            return Ok(contact);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdContact = await _service.CreateAsync(contact);
            return CreatedAtAction(nameof(GetById), new { id = createdContact.Id }, createdContact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.UpdateAsync(id, contact);
            if (!updated)
                return NotFound(new { Message = $"Contact with ID {id} not found." });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted)
                return NotFound(new { Message = $"Contact with ID {id} not found." });

            return NoContent();
        }
    }
}
