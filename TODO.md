# TODO: Add Delete Message Button for Moderators/Admins

- [x] Add `deleteMessage(messageId)` function in `script.js` to delete message from database and remove from DOM
- [x] Modify `addMessage` function in `script.js` to conditionally add delete button (❌ icon) to the right of timestamp if user level >= 3
- [x] Add CSS styles for delete button in `stylesheet.css` (position far right, subtle gray, hover effects)
- [ ] Test delete functionality on messages page
- [ ] Verify only level 3+ users can see/use the button
- [ ] Ensure real-time updates handle deleted messages (add DELETE listener if needed)
