export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
        };
        Update: {
          name?: string;
          email?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
