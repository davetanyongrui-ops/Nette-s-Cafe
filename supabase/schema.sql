-- Create Profiles Table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone_number TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'staff', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: In a real environment, you'd trigger this automatically on user signup.
-- create function public.handle_new_user() returns trigger as $$
-- begin
--   insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data->>'full_name');
--   return new;
-- end;
-- $$ language plpgsql security definer;
-- create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Create Menu Items Table (Our internal CMS)
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('soup', 'muffin', 'salad_base', 'salad_protein', 'salad_dressing', 'salad_topping')),
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_sold_out BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id), -- Nullable for guest checkouts
  order_type TEXT NOT NULL CHECK (order_type IN ('eat-in', 'takeaway')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'completed', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'verified', 'manual_verification_required')),
  receipt_image_url TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  customizations JSONB DEFAULT '{}'::jsonb, 
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 1. Anyone can view menu items
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Menu items are viewable by everyone." ON menu_items FOR SELECT USING (true);

-- 2. Only Admins can modify menu items
-- Requires a function to check admin role
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND (role = 'admin' OR role = 'staff')
  );
$$ LANGUAGE sql SECURITY DEFINER;

CREATE POLICY "Admins can insert menu items" ON menu_items FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update menu items" ON menu_items FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete menu items" ON menu_items FOR DELETE USING (is_admin());

-- 3. Orders: Anyone can insert an order, but users can only view their own
CREATE POLICY "Anyone can create an order" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL OR is_admin());
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (is_admin());

-- 4. Order Items
CREATE POLICY "Anyone can create order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR orders.user_id IS NULL OR is_admin()))
);

