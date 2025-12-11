# Admin Devices Management Page

## Overview
Halaman untuk manage devices di admin dashboard dengan tampilan table yang clean dan fitur CRUD (Create, Read, Update, Delete).

## Features

### 1. **Devices Table**
- ✅ Display all devices from API
- ✅ Show: Image, Name, Codename, Status, Updated Date
- ✅ Exclude: Created At (as requested)
- ✅ Responsive table design

### 2. **Device Information Displayed**
- **Image**: Device photo (48x48px)
- **Name**: Device name (bold)
- **Codename**: Monospace font with background
- **Status**: Badge (ACTIVE/DISCONTINUED)
- **Updated**: Relative time (e.g., "2 days ago")

### 3. **Actions**
- **Edit**: Edit device button (placeholder)
- **Delete**: Delete device with confirmation (placeholder)
- **Add Device**: Add new device button (placeholder)

### 4. **States**
- **Loading**: Spinner while fetching data
- **Empty**: Message when no devices found
- **Error**: Error message if fetch fails

## API Integration

### Endpoint
```
GET ${API_BASE_URL}/devices
```

### Response Structure
```json
{
  "success": true,
  "data": [
    {
      "id": "87sd6s5g76sdy7s",
      "name": "Mi A1",
      "codename": "tissot",
      "image": "https://i.ibb.co.com/Yd7f6HV/tissot.jpg",
      "status": "DISCONTINUED",
      "createdAt": "2025-08-21T17:31:17.000Z",
      "updatedAt": "2025-08-21T17:31:19.000Z"
    }
  ]
}
```

### Fields Displayed
- ✅ `id` - Used for actions
- ✅ `name` - Device name
- ✅ `codename` - Device codename
- ✅ `image` - Device image
- ✅ `status` - ACTIVE or DISCONTINUED
- ✅ `updatedAt` - Last update time
- ❌ `createdAt` - NOT displayed (as requested)

## UI Components

### Table Structure
```
┌─────────┬──────────┬──────────┬────────┬─────────┬─────────┐
│ Image   │ Name     │ Codename │ Status │ Updated │ Actions │
├─────────┼──────────┼──────────┼────────┼─────────┼─────────┤
│ [img]   │ Mi A1    │ tissot   │ 🔴 DIS │ 2d ago  │ ✏️ 🗑️  │
│ [img]   │ Redmi 5  │ rosy     │ 🟢 ACT │ 1d ago  │ ✏️ 🗑️  │
└─────────┴──────────┴──────────┴────────┴─────────┴─────────┘
```

### Status Badges
- **ACTIVE**: Green badge with dot
- **DISCONTINUED**: Red badge with dot

### Action Buttons
- **Edit**: Pencil icon
- **Delete**: Trash icon

## Features Detail

### 1. Date Formatting
Relative time display:
```javascript
- Today
- Yesterday
- 2 days ago
- 7 days ago
- Jan 15, 2025 (if > 7 days)
```

### 2. Status Badge
```css
.status-badge.active {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
}

.status-badge.discontinued {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}
```

### 3. Hover Effects
- Table row hover: Background change
- Action buttons hover: Border color change
- Delete button hover: Red highlight

## Responsive Design

### Desktop (≥768px)
- Full table visible
- All columns shown
- Horizontal layout

### Mobile (<768px)
- Horizontal scroll
- Table min-width: 800px
- Add button full width

## Loading States

### Initial Load
```
┌─────────────────────────────────┐
│         [Spinner]               │
│     Loading devices...          │
└─────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────┐
│         [Device Icon]           │
│      No devices found           │
│  Get started by adding first    │
│      [Add Device Button]        │
└─────────────────────────────────┘
```

### Error State
```
┌─────────────────────────────────┐
│  Error loading devices.         │
│     Please try again.           │
└─────────────────────────────────┘
```

## Placeholder Functions

### Add Device
```javascript
addDeviceBtn.addEventListener('click', () => {
    alert('Add device form will be implemented next.');
});
```

### Edit Device
```javascript
window.editDevice = function(id) {
    alert(`Edit device: ${id}`);
}
```

### Delete Device
```javascript
window.deleteDevice = function(id, name) {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
        alert(`Delete device: ${id}`);
    }
}
```

## Next Steps

### To Implement
1. ⏳ Add Device Form (Modal/Page)
2. ⏳ Edit Device Form (Modal/Page)
3. ⏳ Delete Device API Integration
4. ⏳ Search & Filter
5. ⏳ Pagination
6. ⏳ Sorting
7. ⏳ Bulk Actions

## Testing

### Test Checklist
- ✅ Page loads without errors
- ✅ Devices fetched from API
- ✅ Table displays all devices
- ✅ Images load correctly
- ✅ Status badges show correct colors
- ✅ Updated date formatted correctly
- ✅ Edit button shows alert
- ✅ Delete button shows confirmation
- ✅ Add button shows alert
- ✅ Empty state shows when no devices
- ✅ Error state shows on API error
- ✅ Responsive on mobile

## Files

- `src/pages/admin/devices.astro` - Devices management page

## Usage

1. Navigate to `/admin/devices`
2. View all devices in table
3. Click "Add Device" to add new (placeholder)
4. Click edit icon to edit device (placeholder)
5. Click delete icon to delete device (placeholder)

## Result

✅ **Devices management page with:**
- Clean table layout
- All device information (except createdAt)
- Status badges
- Action buttons
- Loading states
- Empty state
- Error handling
- Responsive design
- Ready for CRUD implementation
