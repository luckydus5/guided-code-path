export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          language: string | null
          lessons_required: number | null
          name: string
          xp_required: number | null
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          language?: string | null
          lessons_required?: number | null
          name: string
          xp_required?: number | null
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          language?: string | null
          lessons_required?: number | null
          name?: string
          xp_required?: number | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          created_at: string
          description: string | null
          difficulty: string
          expected_output: string | null
          explanation: string | null
          hints: string[] | null
          id: string
          instructions: string
          language: string
          learning_objectives: string[] | null
          level: string
          order_index: number
          solution: string
          starter_code: string | null
          title: string
          unit: number
          updated_at: string
          xp_value: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty: string
          expected_output?: string | null
          explanation?: string | null
          hints?: string[] | null
          id?: string
          instructions: string
          language: string
          learning_objectives?: string[] | null
          level: string
          order_index: number
          solution: string
          starter_code?: string | null
          title: string
          unit: number
          updated_at?: string
          xp_value?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: string
          expected_output?: string | null
          explanation?: string | null
          hints?: string[] | null
          id?: string
          instructions?: string
          language?: string
          learning_objectives?: string[] | null
          level?: string
          order_index?: number
          solution?: string
          starter_code?: string | null
          title?: string
          unit?: number
          updated_at?: string
          xp_value?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          last_activity: string | null
          level: number
          streak: number
          updated_at: string
          user_id: string
          username: string | null
          xp: number
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          last_activity?: string | null
          level?: number
          streak?: number
          updated_at?: string
          user_id: string
          username?: string | null
          xp?: number
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          last_activity?: string | null
          level?: number
          streak?: number
          updated_at?: string
          user_id?: string
          username?: string | null
          xp?: number
        }
        Relationships: []
      }
      project_badges: {
        Row: {
          color: string
          created_at: string
          criteria: Json | null
          description: string
          icon: string
          id: string
          name: string
        }
        Insert: {
          color: string
          created_at?: string
          criteria?: Json | null
          description: string
          icon: string
          id?: string
          name: string
        }
        Update: {
          color?: string
          created_at?: string
          criteria?: Json | null
          description?: string
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      project_completions: {
        Row: {
          completed_at: string
          created_at: string
          deployment_url: string | null
          difficulty: string | null
          final_code: Json | null
          github_repo_url: string | null
          id: string
          language: string
          notes: string | null
          project_id: string
          skills_learned: string[] | null
          time_spent_seconds: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          deployment_url?: string | null
          difficulty?: string | null
          final_code?: Json | null
          github_repo_url?: string | null
          id?: string
          language: string
          notes?: string | null
          project_id: string
          skills_learned?: string[] | null
          time_spent_seconds?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          deployment_url?: string | null
          difficulty?: string | null
          final_code?: Json | null
          github_repo_url?: string | null
          id?: string
          language?: string
          notes?: string | null
          project_id?: string
          skills_learned?: string[] | null
          time_spent_seconds?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          attempts: number
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          language: string
          lesson_id: string
          time_spent_seconds: number
          user_id: string
        }
        Insert: {
          attempts?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          language: string
          lesson_id: string
          time_spent_seconds?: number
          user_id: string
        }
        Update: {
          attempts?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          language?: string
          lesson_id?: string
          time_spent_seconds?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_project_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          project_completion_id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          project_completion_id: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          project_completion_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_project_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "project_badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_project_badges_project_completion_id_fkey"
            columns: ["project_completion_id"]
            isOneToOne: false
            referencedRelation: "project_completions"
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
  public: {
    Enums: {},
  },
} as const
