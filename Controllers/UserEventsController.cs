using CalenderApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalenderApp.Controllers
{
    public class UserEventsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserEventsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: UserEvents
        public async Task<IActionResult> Index()
        {
            return View(await _context.UserEvents.ToListAsync());
        }

        // GET: UserEvents/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.UserEvents == null)
            {
                return NotFound();
            }

            var userEvents = await _context.UserEvents
                .FirstOrDefaultAsync(m => m.EventId == id);
            if (userEvents == null)
            {
                return NotFound();
            }

            return View(userEvents);
        }

        // GET: UserEvents/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: UserEvents/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("EventId,Title,Description,Created")] UserEvents userEvents)
        {
            if (ModelState.IsValid)
            {
                _context.Add(userEvents);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(userEvents);
        }

        // GET: UserEvents/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.UserEvents == null)
            {
                return NotFound();
            }

            var userEvents = await _context.UserEvents.FindAsync(id);
            if (userEvents == null)
            {
                return NotFound();
            }
            return View(userEvents);
        }

        // POST: UserEvents/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("EventId,Title,Description,Created")] UserEvents userEvents)
        {
            if (id != userEvents.EventId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(userEvents);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserEventsExists(userEvents.EventId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(userEvents);
        }

        // GET: UserEvents/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.UserEvents == null)
            {
                return NotFound();
            }

            var userEvents = await _context.UserEvents
                .FirstOrDefaultAsync(m => m.EventId == id);
            if (userEvents == null)
            {
                return NotFound();
            }

            return View(userEvents);
        }

        // POST: UserEvents/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.UserEvents == null)
            {
                return Problem("Entity set 'ApplicationDbContext.UserEvents'  is null.");
            }
            var userEvents = await _context.UserEvents.FindAsync(id);
            if (userEvents != null)
            {
                _context.UserEvents.Remove(userEvents);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserEventsExists(int id)
        {
            return _context.UserEvents.Any(e => e.EventId == id);
        }
    }
}
