export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Channel: {
        Row: {
          createdAt: string
          id: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Conversation: {
        Row: {
          createdAt: string
          id: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          updatedAt?: string
        }
        Relationships: []
      }
      DirectMessage: {
        Row: {
          createdAt: string
          id: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Member: {
        Row: {
          createdAt: string
          id: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Message: {
        Row: {
          createdAt: string
          id: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Profile: {
        Row: {
          createdAt: string
          displayName: string
          email: string
          id: string
          imageUrl: string
          updatedAt: string
          username: string
        }
        Insert: {
          createdAt?: string
          displayName: string
          email: string
          id: string
          imageUrl: string
          updatedAt: string
          username: string
        }
        Update: {
          createdAt?: string
          displayName?: string
          email?: string
          id?: string
          imageUrl?: string
          updatedAt?: string
          username?: string
        }
        Relationships: []
      }
      Server: {
        Row: {
          createdAt: string
          id: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          updatedAt?: string
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
      ChannelType: "TEXT" | "AUDIO" | "VIDEO"
      MemberRole: "ADMIN" | "MODERATOR" | "GUEST"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
