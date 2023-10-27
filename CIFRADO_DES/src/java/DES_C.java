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
import javax.crypto.spec.SecretKeySpec;

/**
 *
 * @author ibarr
 */
@WebServlet(urlPatterns = {"/DES_C"})
@MultipartConfig
public class DES_C extends HttpServlet {

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
            response.setContentType("text/html;charset=UTF-8");

            /* TODO output your page here. You may use following sample code. */
            
            Part archivo_c = request.getPart("archivo_c");
            String nombreArchivo_c = Paths.get(archivo_c.getSubmittedFileName()).getFileName().toString();
            InputStream contenido_c = archivo_c.getInputStream();

            String claveUsuario = request.getParameter("clave");

            OutputStream out = null;
            try {
                byte[] claveBytes = claveUsuario.getBytes();
                SecretKey clave = new SecretKeySpec(claveBytes, 0, claveBytes.length, "DES");

                Cipher cifrado = Cipher.getInstance("DES/ECB/PKCS5Padding");
                cifrado.init(Cipher.ENCRYPT_MODE, clave);

                byte[] buffer = new byte[1000];
                int bytesleidos = contenido_c.read(buffer, 0, 1000);

                response.setContentType("application/octet-stream");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + nombreArchivo_c + ".cifrado\"");

                out = response.getOutputStream();
                while(bytesleidos != -1){
                    byte[] bufferCifrado = cifrado.update(buffer, 0, bytesleidos);
                    out.write(bufferCifrado);
                    bytesleidos = contenido_c.read(buffer, 0, 1000);
                }

                byte[] bufferCifrado = cifrado.doFinal();
                out.write(bufferCifrado);
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
