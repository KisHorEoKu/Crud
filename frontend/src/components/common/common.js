import React from 'react'

export const common = () => {

    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
    
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    } 
    async function hashPassword(password) {
        // Convert the password string into an ArrayBuffer
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
    
        // Hash the password using SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        
        // Convert the ArrayBuffer to a hexadecimal string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    }
    

    // // Example usage:
    // const password = "mySecurePassword";
    // hashPassword(password).then(hash => {
    //     console.log("Hashed Password:", hash);
    // });
    
  return (
    <div>

    </div>
  )
}
