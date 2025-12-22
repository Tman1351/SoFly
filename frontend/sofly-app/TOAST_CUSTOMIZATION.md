# Toast Customization Guide

## 📍 Where to Edit Toasts

### 1. **Toast Messages & Content**
**File:** `app/hooks/useWaitlistForm.ts`

Edit the actual toast messages that appear:

```typescript
// Line 21-23: Loading toast
toast.loading("Adding you to the waitlist...", {
  description: "Please wait while we process your request",
});

// Line 40-44: Success toast
toast.success("You're on the list! ✈️", {
  id: toastId,
  description: data.message || "We'll notify you when we launch.",
  duration: 5000,  // How long it shows (milliseconds)
});

// Line 50-54: Error toast
toast.error("Failed to join waitlist", {
  id: toastId,
  description: errorMessage,
  duration: 5000,
});
```

**What you can change:**
- Title text (first parameter)
- Description text
- Duration (how long toast stays visible)
- Add icons, actions, etc.

---

### 2. **Toast Styling & Appearance**
**File:** `components/ui/sonner.tsx`

Edit how toasts look:

#### **Position** (Line 20)
```typescript
position="top-right"  // Options: "top-left", "top-center", "top-right", 
                      //          "bottom-left", "bottom-center", "bottom-right"
```

#### **Icons** (Lines 22-27)
```typescript
icons={{
  success: <CircleCheck className="h-4 w-4" />,  // Change icon or size
  info: <Info className="h-4 w-4" />,
  warning: <TriangleAlert className="h-4 w-4" />,
  error: <OctagonX className="h-4 w-4" />,
  loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
}}
```

#### **Colors & Styling** (Lines 29-40)
```typescript
toastOptions={{
  classNames: {
    // General toast styling
    toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 ...",
    
    // Description text color
    description: "group-[.toast]:text-gray-600",
    
    // Success toast colors
    success: "group-[.toaster]:border-green-200 group-[.toaster]:bg-green-50",
    
    // Error toast colors
    error: "group-[.toaster]:border-red-200 group-[.toaster]:bg-red-50",
  },
}}
```

**Customize:**
- Background colors
- Border colors
- Text colors
- Shadow, border radius, etc.

---

## 🎨 Quick Customization Examples

### Change Toast Position
In `components/ui/sonner.tsx`:
```typescript
position="bottom-right"  // Change from top-right
```

### Change Success Message
In `app/hooks/useWaitlistForm.ts`:
```typescript
toast.success("Welcome aboard! 🎉", {  // Change title
  id: toastId,
  description: "You've been added to our waitlist.",  // Change description
  duration: 7000,  // Show for 7 seconds instead of 5
});
```

### Change Toast Colors
In `components/ui/sonner.tsx`:
```typescript
success: "group-[.toaster]:border-blue-200 group-[.toaster]:bg-blue-50",  // Blue instead of green
```

### Change Icons
In `components/ui/sonner.tsx`:
```typescript
import { Plane, CheckCircle2 } from "lucide-react"  // Import different icons

icons={{
  success: <Plane className="h-5 w-5 text-[#0062B8]" />,  // Use Plane icon
  // ...
}}
```

### Add Custom Styling
In `components/ui/sonner.tsx`, add to `classNames`:
```typescript
toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-2 group-[.toaster]:border-[#0062B8] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl",
```

---

## 📝 Toast Options Reference

When calling `toast.success()`, `toast.error()`, etc., you can use:

```typescript
toast.success("Title", {
  description: "Description text",
  duration: 5000,              // Milliseconds (Infinity = never auto-dismiss)
  id: "unique-id",             // For updating same toast
  action: {                    // Add action button
    label: "Undo",
    onClick: () => console.log("Undo")
  },
  cancel: {                    // Add cancel button
    label: "Cancel",
    onClick: () => console.log("Cancel")
  },
  icon: <CustomIcon />,        // Custom icon
  className: "custom-class",   // Additional CSS classes
})
```

---

## 🎯 Common Customizations

### Make Toasts Last Longer
```typescript
duration: 10000  // 10 seconds
```

### Change Success Icon to Plane
```typescript
import { Plane } from "lucide-react"

icons={{
  success: <Plane className="h-4 w-4 text-[#0062B8]" />,
  // ...
}}
```

### Use SoFly Blue for Success
```typescript
success: "group-[.toaster]:border-[#0062B8] group-[.toaster]:bg-blue-50",
```

### Center Position
```typescript
position="top-center"
```

---

## 📂 File Locations Summary

| What to Edit | File | Lines |
|-------------|------|-------|
| **Toast Messages** | `app/hooks/useWaitlistForm.ts` | 21-62 |
| **Toast Styling** | `components/ui/sonner.tsx` | 15-43 |
| **Toast Position** | `components/ui/sonner.tsx` | 20 |
| **Toast Icons** | `components/ui/sonner.tsx` | 22-27 |

