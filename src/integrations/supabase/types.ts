export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      admin_sessions: {
        Row: {
          created_at: string
          expires_at: string
          token: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          token?: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          token?: string
        }
        Relationships: []
      }
      cake_requests: {
        Row: {
          created_at: string
          customer_name: string
          flavour: string | null
          fulfilment: string
          id: string
          layers: string | null
          message_on_cake: string | null
          notes: string | null
          occasion: string | null
          phone: string
          reference_image_url: string | null
          size: string | null
          status: string
          updated_at: string
          wanted_date: string | null
          wanted_time: string | null
        }
        Insert: {
          created_at?: string
          customer_name: string
          flavour?: string | null
          fulfilment?: string
          id?: string
          layers?: string | null
          message_on_cake?: string | null
          notes?: string | null
          occasion?: string | null
          phone: string
          reference_image_url?: string | null
          size?: string | null
          status?: string
          updated_at?: string
          wanted_date?: string | null
          wanted_time?: string | null
        }
        Update: {
          created_at?: string
          customer_name?: string
          flavour?: string | null
          fulfilment?: string
          id?: string
          layers?: string | null
          message_on_cake?: string | null
          notes?: string | null
          occasion?: string | null
          phone?: string
          reference_image_url?: string | null
          size?: string | null
          status?: string
          updated_at?: string
          wanted_date?: string | null
          wanted_time?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          address: string | null
          created_at: string
          customer_name: string
          delivery_fee: number
          email: string | null
          fulfilment: string
          id: string
          items: Json
          notes: string | null
          payment_method: string
          payment_status: string
          phone: string
          reference: string
          status: string
          subtotal: number
          total: number
          updated_at: string
          wanted_date: string | null
          wanted_time: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          customer_name: string
          delivery_fee?: number
          email?: string | null
          fulfilment?: string
          id?: string
          items?: Json
          notes?: string | null
          payment_method?: string
          payment_status?: string
          phone: string
          reference?: string
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
          wanted_date?: string | null
          wanted_time?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          customer_name?: string
          delivery_fee?: number
          email?: string | null
          fulfilment?: string
          id?: string
          items?: Json
          notes?: string | null
          payment_method?: string
          payment_status?: string
          phone?: string
          reference?: string
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
          wanted_date?: string | null
          wanted_time?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          available: boolean
          category: string
          created_at: string
          desc_ar: string
          desc_en: string
          desc_nl: string
          featured: boolean
          id: string
          image_url: string | null
          name_ar: string
          name_en: string
          name_nl: string
          price: number
          slug: string
          sort_order: number
          unit: string
          updated_at: string
        }
        Insert: {
          available?: boolean
          category: string
          created_at?: string
          desc_ar?: string
          desc_en?: string
          desc_nl?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          name_ar: string
          name_en: string
          name_nl: string
          price?: number
          slug: string
          sort_order?: number
          unit?: string
          updated_at?: string
        }
        Update: {
          available?: boolean
          category?: string
          created_at?: string
          desc_ar?: string
          desc_en?: string
          desc_nl?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          name_ar?: string
          name_en?: string
          name_nl?: string
          price?: number
          slug?: string
          sort_order?: number
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      store_settings: {
        Row: {
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
