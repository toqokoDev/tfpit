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
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      announcement_responses: {
        Row: {
          announcement_id: string
          created_at: string | null
          id: string
          message: string
          role_id: string
          updated_at: string | null
          user_id: string
          user_profile_id: string
        }
        Insert: {
          announcement_id: string
          created_at?: string | null
          id?: string
          message: string
          role_id: string
          updated_at?: string | null
          user_id: string
          user_profile_id: string
        }
        Update: {
          announcement_id?: string
          created_at?: string | null
          id?: string
          message?: string
          role_id?: string
          updated_at?: string | null
          user_id?: string
          user_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcement_responses_announcement_id_fkey"
            columns: ["announcement_id"]
            isOneToOne: false
            referencedRelation: "announcements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "announcement_responses_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "announcement_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "announcement_responses_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          additional_requirements: string[] | null
          city: string
          created_at: string | null
          description: string
          experience_level: string | null
          gender_preference: string | null
          id: string
          location_name: string | null
          references_urls: string[] | null
          responses_count: number | null
          role_id: string
          shooting_date: string | null
          shooting_date_type: string
          shooting_genre_id: string | null
          status: string
          title: string
          updated_at: string | null
          user_id: string
          views_count: number | null
        }
        Insert: {
          additional_requirements?: string[] | null
          city: string
          created_at?: string | null
          description: string
          experience_level?: string | null
          gender_preference?: string | null
          id?: string
          location_name?: string | null
          references_urls?: string[] | null
          responses_count?: number | null
          role_id: string
          shooting_date?: string | null
          shooting_date_type?: string
          shooting_genre_id?: string | null
          status?: string
          title: string
          updated_at?: string | null
          user_id: string
          views_count?: number | null
        }
        Update: {
          additional_requirements?: string[] | null
          city?: string
          created_at?: string | null
          description?: string
          experience_level?: string | null
          gender_preference?: string | null
          id?: string
          location_name?: string | null
          references_urls?: string[] | null
          responses_count?: number | null
          role_id?: string
          shooting_date?: string | null
          shooting_date_type?: string
          shooting_genre_id?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "announcements_shooting_genre_id_fkey"
            columns: ["shooting_genre_id"]
            isOneToOne: false
            referencedRelation: "shooting_genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "announcements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      hairdressers: {
        Row: {
          additional_info: string[] | null
          created_at: string | null
          equipment: string[] | null
          id: string
          specialties: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          additional_info?: string[] | null
          created_at?: string | null
          equipment?: string[] | null
          id?: string
          specialties?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          additional_info?: string[] | null
          created_at?: string | null
          equipment?: string[] | null
          id?: string
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hairdressers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      models: {
        Row: {
          additional_info: string[] | null
          bust: number
          clothing_sizes: string[]
          created_at: string | null
          eye_color: string
          hair_color: string
          hair_length: string
          has_piercings: boolean | null
          has_scars: boolean | null
          has_tattoos: boolean | null
          height: number
          hips: number
          id: string
          shoe_size: number
          updated_at: string | null
          user_id: string
          waist: number
          weight: number
        }
        Insert: {
          additional_info?: string[] | null
          bust: number
          clothing_sizes?: string[]
          created_at?: string | null
          eye_color: string
          hair_color: string
          hair_length: string
          has_piercings?: boolean | null
          has_scars?: boolean | null
          has_tattoos?: boolean | null
          height: number
          hips: number
          id?: string
          shoe_size: number
          updated_at?: string | null
          user_id: string
          waist: number
          weight: number
        }
        Update: {
          additional_info?: string[] | null
          bust?: number
          clothing_sizes?: string[]
          created_at?: string | null
          eye_color?: string
          hair_color?: string
          hair_length?: string
          has_piercings?: boolean | null
          has_scars?: boolean | null
          has_tattoos?: boolean | null
          height?: number
          hips?: number
          id?: string
          shoe_size?: number
          updated_at?: string | null
          user_id?: string
          waist?: number
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "models_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      photographers: {
        Row: {
          additional_info: string | null
          camera: string
          created_at: string | null
          id: string
          lenses: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          additional_info?: string | null
          camera: string
          created_at?: string | null
          id?: string
          lenses?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          additional_info?: string | null
          camera?: string
          created_at?: string | null
          id?: string
          lenses?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "photographers_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolios: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_url: string
          is_public: boolean
          likes_count: number
          updated_at: string
          user_id: string
          views_count: number
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_url: string
          is_public?: boolean
          likes_count?: number
          updated_at?: string
          user_id: string
          views_count?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          is_public?: boolean
          likes_count?: number
          updated_at?: string
          user_id?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "portfolios_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          description: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      shooting_genres: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          slug: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          slug: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      socials: {
        Row: {
          created_at: string
          id: string
          instagram: string | null
          telegram: string | null
          updated_at: string
          user_id: string
          vk: string | null
          website: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          instagram?: string | null
          telegram?: string | null
          updated_at?: string
          user_id?: string
          vk?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          instagram?: string | null
          telegram?: string | null
          updated_at?: string
          user_id?: string
          vk?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "socials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stylists: {
        Row: {
          additional_info: string[] | null
          created_at: string | null
          id: string
          skills: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          additional_info?: string[] | null
          created_at?: string | null
          id?: string
          skills?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          additional_info?: string[] | null
          created_at?: string | null
          id?: string
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stylists_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          birth_date: string | null
          city: string | null
          cover_url: string | null
          created_at: string
          email: string
          experience_level: number | null
          first_name: string
          gender: string | null
          id: string
          last_name: string
          phone: string | null
          portfolio_links: Json | null
          rating: number | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          city?: string | null
          cover_url?: string | null
          created_at?: string
          email: string
          experience_level?: number | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string
          phone?: string | null
          portfolio_links?: Json | null
          rating?: number | null
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          city?: string | null
          cover_url?: string | null
          created_at?: string
          email?: string
          experience_level?: number | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string
          phone?: string | null
          portfolio_links?: Json | null
          rating?: number | null
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
