/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//porquerias necesarias
import javax.servlet.http.Part;
import java.nio.file.Paths;
import javax.servlet.annotation.MultipartConfig;

//Seguridad
import java.security.*;
import javax.crypto.*;
import java.io.*;
import java.nio.file.Files;
import javax.crypto.spec.SecretKeySpec;


/**
 *
 * @author ibarr
 */
@WebServlet(urlPatterns = {"/DES_D"})
@MultipartConfig
public class DES_D extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            Part archivo_d = request.getPart("archivo_d");
        String nombreArchivo_d = Paths.get(archivo_d.getSubmittedFileName()).getFileName().toString();
        InputStream contenido_d = archivo_d.getInputStream();

        String claveUsuario = request.getParameter("clave");

        OutputStream out = null;
        try {
            byte[] claveBytes = claveUsuario.getBytes();
            SecretKey clave = new SecretKeySpec(claveBytes, 0, claveBytes.length, "DES");

            Cipher cifrado = Cipher.getInstance("DES/ECB/PKCS5Padding");
            cifrado.init(Cipher.DECRYPT_MODE, clave);

            byte[] buffer = new byte[1000];
            int bytesleidos = contenido_d.read(buffer, 0, 1000);

            File tempFile = File.createTempFile("descifrado", ".tmp");
            out = new FileOutputStream(tempFile);
            while(bytesleidos != -1){
                byte[] bufferPlano = cifrado.update(buffer, 0, bytesleidos);
                out.write(bufferPlano);
                bytesleidos = contenido_d.read(buffer, 0, 1000);
            }

            byte[] bufferPlano = cifrado.doFinal();
            out.write(bufferPlano);

            // Preparar la respuesta para la descarga
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + nombreArchivo_d + ".descifrado\"");
            
            // Enviar el archivo descifrado
            Files.copy(tempFile.toPath(), response.getOutputStream());
        } catch (Exception e) {
            e.printStackTrace();
        }
            
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
