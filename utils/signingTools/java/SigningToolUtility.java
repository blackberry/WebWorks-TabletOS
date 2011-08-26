import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.prefs.Preferences;

import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPasswordField;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.JTextPane;

public class SigningToolUtility {

	private JFrame frame;
	
	private JTextField keysPath1;
	private JTextField keysPath2;
	private JTextField bbwpPath;
	private JPasswordField csjPin;
	private JPasswordField cskPass;
	private JTextField companyName;
	private JTextArea consolePane;
	
	private static String FILE_SEPERATOR = System.getProperty("file.separator");
	private static String LINE_SEPERATOR = System.getProperty("line.separator");
	
	

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					SigningTool window = new SigningTool();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public SigningTool() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		Preferences prefs = Preferences.userNodeForPackage(getClass());
		frame = new JFrame();
		frame.setBounds(100, 100, 761, 600);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		frame.setTitle("Signing utility");

		JLabel lblNewLabel = new JLabel("1st Key Location");
		lblNewLabel.setBounds(6, 19, 117, 16);
		frame.getContentPane().add(lblNewLabel);

		keysPath1 = new JTextField();

		keysPath1.setBounds(135, 13, 468, 28);
		frame.getContentPane().add(keysPath1);
		keysPath1.setColumns(10);
		keysPath1.setText(prefs.get("keysPath1", ""));

		final JFileChooser fc = new JFileChooser();
		fc.setFileSelectionMode(JFileChooser.FILES_ONLY);
		fc.setFileFilter(new javax.swing.filechooser.FileFilter() {
			@Override
			public String getDescription() {
				return "Only csj files";
			}
			
			@Override
			public boolean accept(File f) {
				if(f.getName().endsWith("csj"))
					return true;
				return false;
					
			}
		});

		final JButton btnNewButton = new JButton("Browse");
		btnNewButton.setBounds(615, 14, 117, 29);
		frame.getContentPane().add(btnNewButton);
		btnNewButton.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (e.getSource() == btnNewButton) {
					int returnVal = fc.showOpenDialog(frame);

					if (returnVal == JFileChooser.APPROVE_OPTION) {
						File file = fc.getSelectedFile();
						keysPath1.setText(file.getAbsolutePath());
					}
				}
			}
		});
		
		
		JLabel lblNewLabel_4 = new JLabel("2nd Key Location");
		lblNewLabel_4.setBounds(6, 47, 117, 16);
		frame.getContentPane().add(lblNewLabel_4);
		
		keysPath2 = new JTextField();
		keysPath2.setBounds(135, 41, 468, 28);
		frame.getContentPane().add(keysPath2);
		keysPath2.setColumns(10);
		keysPath2.setText(prefs.get("keysPath2", ""));
		
		final JFileChooser fc2 = new JFileChooser();
		fc2.setFileSelectionMode(JFileChooser.FILES_ONLY);
		fc2.setFileFilter(new javax.swing.filechooser.FileFilter() {
			@Override
			public String getDescription() {
				return "Only csj files";
			}
			
			@Override
			public boolean accept(File f) {
				if(f.getName().endsWith("csj"))
					return true;
				return false;
					
			}
		});
		final JButton btnNewButton_2 = new JButton("Browse");
		btnNewButton_2.setBounds(615, 42, 117, 29);
		frame.getContentPane().add(btnNewButton_2);
		btnNewButton_2.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
		
				if (e.getSource() == btnNewButton_2) {
					int returnVal = fc2.showOpenDialog(frame);

					if (returnVal == JFileChooser.APPROVE_OPTION) {
						File file = fc2.getSelectedFile();
						keysPath2.setText(file.getAbsolutePath());
					} 
				}
			}
		});
		

		JLabel lblNewLabel_1 = new JLabel("BBWP location");
		lblNewLabel_1.setBounds(6, 77, 117, 16);
		frame.getContentPane().add(lblNewLabel_1);

		bbwpPath = new JTextField();
		bbwpPath.setBounds(135, 71, 468, 28);
		frame.getContentPane().add(bbwpPath);
		bbwpPath.setColumns(10);
		bbwpPath.setText(prefs.get("bbwpPath", ""));
		
		final JFileChooser fc1 = new JFileChooser();
		fc1.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
		fc1.setFileFilter(new javax.swing.filechooser.FileFilter() {
			@Override
			public String getDescription() {
				return "bbwp folder containing bbwp.exe";
			}
			
			@Override
			public boolean accept(File f) {
				File bbwp = new File(f.getAbsoluteFile()+"/bbwp.exe");
				if(bbwp.exists()){
					return true;
				}
				return false;	
			}
		});
		final JButton btnNewButton_1 = new JButton("Browse");
		btnNewButton_1.setBounds(615, 72, 117, 29);
		frame.getContentPane().add(btnNewButton_1);

		btnNewButton_1.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
	
				if (e.getSource() == btnNewButton_1) {
					int returnVal = fc1.showOpenDialog(frame);

					if (returnVal == JFileChooser.APPROVE_OPTION) {
						File file = fc1.getSelectedFile();
						bbwpPath.setText(file.getAbsolutePath());
					}
				}
			}
		});

		JLabel lblNewLabel_2 = new JLabel("csjpin");
		lblNewLabel_2.setBounds(6, 105, 117, 16);
		frame.getContentPane().add(lblNewLabel_2);

		JLabel lblNewLabel_3 = new JLabel("cskpass");
		lblNewLabel_3.setBounds(6, 134, 117, 16);
		frame.getContentPane().add(lblNewLabel_3);

		csjPin = new JPasswordField();
		csjPin.setBounds(135, 99, 134, 28);
		frame.getContentPane().add(csjPin);
		csjPin.setColumns(10);
		csjPin.setText(prefs.get("csjPin", ""));

		cskPass = new JPasswordField();
		cskPass.setBounds(135, 128, 134, 28);
		frame.getContentPane().add(cskPass);
		cskPass.setColumns(10);
		cskPass.setText(prefs.get("cskPass", ""));

		

		JLabel lblCompanyName = new JLabel("company Name");
		lblCompanyName.setBounds(6, 162, 117, 16);
		frame.getContentPane().add(lblCompanyName);

		companyName = new JTextField();
		companyName.setBounds(135, 156, 222, 28);
		frame.getContentPane().add(companyName);
		companyName.setColumns(10);
		companyName.setText(prefs.get("companyName", ""));

		
		consolePane = new JTextArea();
		consolePane.setLineWrap(true);
		JScrollPane scrollPane = new JScrollPane(consolePane);
		scrollPane.setLocation(6, 263);
		scrollPane.setSize(749, 295);
		scrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
		scrollPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
		
		consolePane.setEditable(false);
		consolePane.setBounds(6, 241, 743, 315);
		frame.getContentPane().add(scrollPane);
		
		final JButton btnSetupSigning = new JButton("Setup Signing");
		btnSetupSigning.setBounds(152, 203, 117, 29);
		frame.getContentPane().add(btnSetupSigning);

		btnSetupSigning.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (e.getSource() == btnSetupSigning) {
					Process p;
					btnSetupSigning.enableInputMethods(true);
					consolePane.setText("");
					// save the value
					Preferences prefs = Preferences
							.userNodeForPackage(getClass());
					prefs.put("keysPath1", keysPath1.getText());
					prefs.put("keysPath2", keysPath2.getText());
					prefs.put("bbwpPath", bbwpPath.getText());
					prefs.put("csjPin", new String(csjPin.getPassword()));
					prefs.put("cskPass", new String(cskPass.getPassword()));
					prefs.put("companyName", companyName.getText());
					
					String bbSDKBinPath = bbwpPath.getText()
					+ FILE_SEPERATOR+"blackberry-tablet-sdk"+FILE_SEPERATOR+"bin"+FILE_SEPERATOR;
					try {
						//Step 1 - run blackberry-keytool
						File sigFile = new File( bbSDKBinPath+"sigtool.p12");
						if(sigFile.exists()){
							writeToTextPane("sigtool.p12 already exists under "+ sigFile.getAbsolutePath());
							return;
						}
						writeToTextPane("Step 1 - run blackberry-keytool");
						ProcessBuilder proc = new ProcessBuilder(bbSDKBinPath+
								"blackberry-keytool",
								"-genkeypair", "-keystore", bbSDKBinPath+"sigtool.p12",
								"-storepass",
								new String(cskPass.getPassword()),
								"-dname", "cn=" + companyName.getText(),				
								"-alias", "author");
						
						Process p1 = proc.start();
						printProcess(p1);
						p1.waitFor();
						
						//Step 2 - copy sigtool.p12
						writeToTextPane(LINE_SEPERATOR+"Step 2 - copy sigtool.p12");
						copyfile(bbSDKBinPath+"sigtool.p12", bbwpPath.getText()+ FILE_SEPERATOR +"bin"+ FILE_SEPERATOR +"sigtool.p12");
						
						//Step 3- setup long term keys
						writeToTextPane(LINE_SEPERATOR+"Step 3- setup long term keys");
						proc = new ProcessBuilder(bbSDKBinPath+ "blackberry-signer",
								"-cskdelete");
						
						p1 = proc.start();
						printProcess(p1);
						p1.waitFor();
						
						proc = new ProcessBuilder(bbSDKBinPath+ "blackberry-signer",
								"-csksetup",
								"-cskpass",
								new String(cskPass.getPassword()));
						
						p1 = proc.start();
						printProcess(p1);
						p1.waitFor();
						
						//Step 4 copy csj files from signing server 
						writeToTextPane(LINE_SEPERATOR+"Step 4 copy csj files from signing server ");
						
						String key1FileName = keysPath1.getText().split(FILE_SEPERATOR)[keysPath1.getText().split(FILE_SEPERATOR).length -1];
						String key2FileName = keysPath2.getText().split(FILE_SEPERATOR)[keysPath1.getText().split(FILE_SEPERATOR).length -1];
						
						writeToTextPane("copying file "+ key1FileName);
						copyfile(keysPath1.getText(), bbSDKBinPath + key1FileName);
						writeToTextPane("copying file "+ key2FileName);
						copyfile(keysPath2.getText(), bbSDKBinPath + key2FileName);
						
						//Step 5- enroll with signing authority
						writeToTextPane(LINE_SEPERATOR+"Step 5- enroll with signing authority");
						proc = new ProcessBuilder(bbSDKBinPath+ "blackberry-signer",
								"-register",
								"-csjpin",
								new String(csjPin.getPassword()),
								"-cskpass",
								new String(cskPass.getPassword()),
								key1FileName
						);
						proc.directory(new File(bbSDKBinPath));
						p1 = proc.start();
						printProcess(p1);
						p1.waitFor();
						
						proc = new ProcessBuilder(bbSDKBinPath+ "blackberry-signer",
								"-register",
								"-csjpin",
								new String(csjPin.getPassword()),
								"-cskpass",
								new String(cskPass.getPassword()),
								key2FileName
						);
						
						proc.directory(new File(bbSDKBinPath));
						p1 = proc.start();
						printProcess(p1);
						p1.waitFor();
						btnSetupSigning.enableInputMethods(true);
						
					} catch (Exception e1) {
						writeToTextPane(e1.getMessage());
					}
				}
			}

		});

	}

	public void printProcess(Process p) {
		String s = null;
		try {

			BufferedReader stdInput = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			BufferedReader stdError = new BufferedReader(new InputStreamReader(
					p.getErrorStream()));

			// read the output from the command
			
			while ((s = stdInput.readLine()) != null) {
				writeToTextPane(" " + s);
			}

			// read any errors from the attempted command
			
			while ((s = stdError.readLine()) != null) {
				writeToTextPane(" " + s);
			}

			// System.exit(0);
		} catch (IOException e) {
			writeToTextPane(e.getMessage());
			e.printStackTrace();
			//System.exit(-1);
		}
	}
	
	private void copyfile(String srFile, String dtFile) {
		try {
			File f1 = new File(srFile);
			File f2 = new File(dtFile);
			InputStream in = new FileInputStream(f1);

			OutputStream out = new FileOutputStream(f2);

			byte[] buf = new byte[1024];
			int len;
			while ((len = in.read(buf)) > 0) {
				out.write(buf, 0, len);
			}
			in.close();
			out.close();
			writeToTextPane("File copied.");
		} catch (FileNotFoundException ex) {
			writeToTextPane(ex.getMessage() + " in the specified directory.");
			//System.exit(0);
		} catch (IOException e) {
			writeToTextPane(e.getMessage());
		}
	}
	
	private void writeToTextPane(String s){
		consolePane.setText(consolePane.getText() + s + LINE_SEPERATOR);
	
	}
}
