package security.pojo;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Document(collection= "users")
public class User {
	  @Id
	  private String id;
	  
	  @NotBlank
	  @Size(max = 20)
	  private String username;
	  
	  @NotBlank
	  @Size(max = 50)
	  @Email
	  private String email;
	  
	  @NotBlank
	  @Size(max = 120)
	  private String password;
	  
	  @DBRef
	  private Set<Role> roles = new HashSet<>();

	  public User(String username, String email, String password) {
		    this.username = username;
		    this.email = email;
		    this.password = password;
		  }
	
	  	public User() {
	
	  			}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public Set<Role> getRoles() {
			return roles;
		}

		public void setRoles(Set<Role> roles) {
			this.roles = roles;
		}


	 
	  
}