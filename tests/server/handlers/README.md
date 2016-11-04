Route handlers unit tests
==========

**UPDATE**: the tests are now placed beside the handler files for better organization. Check out `source/server/handlers/**/__tests__`.

These specifications test the behavior of route handler functions in isolation. In particular, the goal of these tests is to make sure that:

- `reply` is called (with `.view()`, `.redirect()`, etc.), no runaway requests
- Handles invalid params or payloads appropriately
- Handles authenticated users appropriately
- Invokes the right method of a DAO object
