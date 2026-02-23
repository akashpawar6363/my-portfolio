export interface Database {  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string          
          name: string          
          email: string
          subject: string
          message: string
          created_at: string
          is_read: boolean
          admin_notes?: string
        }        
        Insert: {
          id?: string
          name: string          
          email: string
          subject: string
          message: string
          created_at?: string
          is_read?: boolean
          admin_notes?: string
        }
        Update: {
          id?: string
          name?: string          
          email?: string
          subject?: string
          message?: string
          created_at?: string
          is_read?: boolean
          admin_notes?: string
        }        
        Relationships: []
      }
    }    
    Views: {      [_: string]: never
    }
    Functions: {      [_: string]: never
    }
    Enums: {      [_: string]: never
    }
    CompositeTypes: {      [_: string]: never
    }
  }
}