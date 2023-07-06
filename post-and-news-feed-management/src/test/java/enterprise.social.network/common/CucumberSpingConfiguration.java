package enterprise.social.network.common;

import enterprise.social.network.PostAndNewsFeedManagementApplication;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

@CucumberContextConfiguration
@SpringBootTest(classes = { PostAndNewsFeedManagementApplication.class })
public class CucumberSpingConfiguration {}
