# Device Search Feature

## Added
Search functionality untuk filter devices by name atau codename dengan real-time filtering.

## Features

### 1. **Search Bar**
- Input field dengan icon search
- Placeholder: "Search devices by name or codename..."
- Clear button (X) yang muncul saat ada text
- Real-time filtering

### 2. **Search Functionality**
- Filter by **device name** (case-insensitive)
- Filter by **codename** (case-insensitive)
- Instant results saat typing
- Results counter

### 3. **Results Counter**
- "No devices found" - jika tidak ada hasil
- "1 device found" - jika 1 hasil
- "X devices found" - jika multiple hasil
- Hidden saat search kosong

## UI Components

### Search Bar
```
┌─────────────────────────────────────────┐
│ 🔍  Search devices by name or codename  ❌│
└─────────────────────────────────────────┘
     ↓
   2 devices found
```

### Clear Button
- Muncul saat ada text
- Click untuk clear search
- Reset ke semua devices

## How It Works

### 1. Data Storage
```javascript
let allDevices = []; // Store all devices from API
```

### 2. Search Logic
```javascript
const filtered = allDevices.filter(device => {
    const searchTerm = query.toLowerCase();
    return device.name.toLowerCase().includes(searchTerm) ||
           device.codename.toLowerCase().includes(searchTerm);
});
```

### 3. Real-time Update
```javascript
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    searchDevices(query); // Filter and display
});
```

## Example Searches

### Search by Name
```
Input: "Mi A1"
Result: Shows Mi A1 device
```

### Search by Codename
```
Input: "tissot"
Result: Shows Mi A1 (codename: tissot)
```

### Partial Match
```
Input: "mi"
Result: Shows all devices with "mi" in name
```

### Case Insensitive
```
Input: "TISSOT" or "tissot" or "Tissot"
Result: All show same results
```

## User Experience

### Typing
1. User types in search box
2. Results filter instantly
3. Counter updates
4. Clear button appears

### Clear
1. User clicks X button
2. Search input cleared
3. All devices shown
4. Counter hidden

### No Results
1. User types non-existent device
2. Table shows empty
3. Counter shows "No devices found"

## CSS Styling

### Search Input
- Focus: Orion border color
- Focus shadow: Orion glow
- Padding for icon and clear button

### Clear Button
- Hidden by default
- Appears when text exists
- Hover effect
- Smooth transition

## Testing

### Test Cases
- ✅ Search by device name
- ✅ Search by codename
- ✅ Partial match works
- ✅ Case insensitive
- ✅ Clear button appears/disappears
- ✅ Clear button resets search
- ✅ Results counter accurate
- ✅ No results shows message
- ✅ Real-time filtering

## Files Modified

- `src/pages/admin/devices.astro`
  - Added search bar HTML
  - Added search CSS
  - Added search JavaScript

## Result

✅ **Search feature dengan:**
- Real-time filtering
- Search by name or codename
- Clear button
- Results counter
- Smooth UX
- Case insensitive
- Instant results
